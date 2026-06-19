package com.gift4u.app.global.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Value("${app.upload.profile-dir:uploads/profiles}")
	private String profileDir;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		Path uploadPath = Paths.get(profileDir).toAbsolutePath();
		String location = uploadPath.toUri().toString();
		if (!location.endsWith("/")) {
			location += "/";
		}

		registry.addResourceHandler("/uploads/profiles/**")
				.addResourceLocations(location);

		// 메시지 카드 전용 자원 매핑
        String messageLocation = "file:" + System.getProperty("user.dir") + "/uploads/messages/";
        registry.addResourceHandler("/uploads/messages/**")
                .addResourceLocations(messageLocation);
	}
}
