package com.gift4u.app.global.security;

import java.io.IOException;
import java.util.regex.Pattern;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

/** Xss(Cross-Site Scripting) 방어 서블릿 필터
 * 
 * 동작 방식 : HTTP 요청의 모든 파라미터에서 HTML태그와 스크립트를 이스케이프 처리
 * 처리 방식 :
 * 	RequestParam, PathVariable > XssRequestWrapper
 * 	RequestBody(JSON) > @JsonDeserialize + XssDeserializer에서 별도 처리
 * 
 * 이스케이프 규칙
 *   &  →  &amp;
 *   <  →  &lt;
 *   >  →  &gt;
 *   "  →  &quot;
 *   '  →  &#x27;
 *   (  →  &#x28;
 *   )  →  &#x29;
 */

@Component
@Order(1)
public class Xssfilter implements Filter {
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// HttpServletRequest만 처리
		if(request instanceof HttpServletRequest httpRequest) {
			chain.doFilter(new XssRequestWrapper(httpRequest), response);
		}else {
			chain.doFilter(request, response);
		}
	}
	

    /**
     * XSS 이스케이프를 적용하는 Request Wrapper.
     *
     * HttpServletRequestWrapper를 상속해 getParameter() 계열 메서드를 오버라이드.
     * 기존 요청 객체를 감싸는 데코레이터 패턴.
     */
    static class XssRequestWrapper extends HttpServletRequestWrapper {
 
        // script, on이벤트, javascript: 등 위험 패턴
        private static final Pattern[] PATTERNS = {
            Pattern.compile("<script>(.*?)</script>", Pattern.CASE_INSENSITIVE),
            Pattern.compile("src[\r\n]*=[\r\n]*'(.*?)'",
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
            Pattern.compile("src[\r\n]*=[\r\n]*\"(.*?)\"",
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
            Pattern.compile("</script>", Pattern.CASE_INSENSITIVE),
            Pattern.compile("<script(.*?)>",
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
            Pattern.compile("eval\\((.*?)\\)",
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
            Pattern.compile("expression\\((.*?)\\)",
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL),
            Pattern.compile("javascript:", Pattern.CASE_INSENSITIVE),
            Pattern.compile("vbscript:", Pattern.CASE_INSENSITIVE),
            Pattern.compile("onload(.*?)=",
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL)
        };
        
        public XssRequestWrapper(HttpServletRequest request) {
        	super(request);
        }
        

        /** 단일 파라미터 값 이스케이프 */
        @Override
        public String getParameter(String name) {
            String value = super.getParameter(name);
            return sanitize(value);
        }
 
        /** 다중 파라미터 값 이스케이프 (체크박스 등) */
        @Override
        public String[] getParameterValues(String name) {
            String[] values = super.getParameterValues(name);
            if (values == null) return null;
 
            String[] sanitized = new String[values.length];
            for (int i = 0; i < values.length; i++) {
                sanitized[i] = sanitize(values[i]);
            }
            return sanitized;
        }
 
        /**
         * 실제 이스케이프 처리.
         * 1단계: HTML 특수문자 이스케이프
         * 2단계: 위험 패턴(script 태그 등) 제거
         */
        private String sanitize(String value) {
            if (value == null) return null;
 
            // 1단계: HTML 특수문자 → 이스케이프 문자 변환
            String result = value
                    .replace("&",  "&amp;")
                    .replace("<",  "&lt;")
                    .replace(">",  "&gt;")
                    .replace("\"", "&quot;")
                    .replace("'",  "&#x27;")
                    .replace("(",  "&#x28;")
                    .replace(")",  "&#x29;");
 
            // 2단계: 위험 스크립트 패턴 제거
            for (Pattern pattern : PATTERNS) {
                result = pattern.matcher(result).replaceAll("");
            }
 
            return result;
        }
    }

}
