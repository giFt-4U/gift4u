package com.gift4u.app.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.gift4u.app.global.security.XssDeserializer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



/** Jackson ObjectMapper 커스텀
 * XssDeserializer를 SimpleModule에 등록
 */

@Configuration
public class JacksonConfig {
	
	@Bean
	public ObjectMapper objectMapper() {
		ObjectMapper mapper = new ObjectMapper();

        SimpleModule xssModule = new SimpleModule("XssProtectionModule");
        xssModule.addDeserializer(String.class, new XssDeserializer());

        mapper.registerModule(xssModule);
        return mapper;
	}

}
