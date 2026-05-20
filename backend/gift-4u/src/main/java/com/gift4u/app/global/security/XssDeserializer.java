package com.gift4u.app.global.security;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
 
import java.io.IOException;

/** JSON RequestBody의 문자열 필드에 XSS 이스케이프 적용하는 jackson 역직렬화
 * 적용 대상 :
 * 	chatMessageRequest.content
 * 	giftCreateRequest.message
 */
public class XssDeserializer extends StdDeserializer<String> {

	// serialVersionUID = 보낸 클래스와 받는 클래스가 똑같은 버전인지 검사
	// 1L = 이 클래스의 버전은 1번사항 명시적 기재
    private static final long serialVersionUID = 1L; 
    
	public XssDeserializer() {
        super(String.class);
    }
	
	/** JSON 문자열 값을 읽어 XSS 이스케이프 후 반환. **/
	@Override
	public String deserialize(JsonParser parser, DeserializationContext context) throws IOException  {
		String value = parser.getValueAsString();
		return sanitize(value);
	}
	
	private String sanitize(String value) {
		if (value == null) return null;
		
		return value
                .replace("&",  "&amp;")
                .replace("<",  "&lt;")
                .replace(">",  "&gt;")
                .replace("\"", "&quot;")
                .replace("'",  "&#x27;")
                .replace("(",  "&#x28;")
                .replace(")",  "&#x29;");
    }
}
