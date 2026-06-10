package com.gift4u.app.domain.user.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gift4u.app.global.exception.ErrorCode;
import com.gift4u.app.global.exception.GlobalException;

import jakarta.annotation.PostConstruct;

@Service
public class ProfileImageStorageService {

	private final Path uploadRoot;
	private final long maxFileSize;

	public ProfileImageStorageService(
			@Value("${app.upload.profile-dir:uploads/profiles}") String profileDir,
			@Value("${app.upload.max-file-size:5242880}") long maxFileSize) {
		this.uploadRoot = Paths.get(profileDir);
		this.maxFileSize = maxFileSize;
	}

	@PostConstruct
	public void init() {
		try {
			Files.createDirectories(uploadRoot);
		} catch (IOException e) {
			throw new GlobalException(ErrorCode.FILE_UPLOAD_FAILED);
		}
	}

	public String save(Long userId, MultipartFile file) {
		validateFile(file);

		String extension = resolveExtension(file);
		String filename = userId + "_" + UUID.randomUUID() + extension;
		Path target = uploadRoot.resolve(filename);

		try (InputStream in = file.getInputStream()) {
			Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			throw new GlobalException(ErrorCode.FILE_UPLOAD_FAILED);
		}

		return "/uploads/profiles/" + filename;
	}

	public void deleteIfLocal(String profileImagePath) {
		if (profileImagePath == null || profileImagePath.isBlank()) {
			return;
		}
		if (!profileImagePath.startsWith("/uploads/")) {
			return;
		}

		Path filePath = Paths.get(profileImagePath.substring(1));
		try {
			Files.deleteIfExists(filePath);
		} catch (IOException e) {
			throw new GlobalException(ErrorCode.FILE_UPLOAD_FAILED);
		}
	}

	private void validateFile(MultipartFile file) {
		if (file == null || file.isEmpty()) {
			throw new GlobalException(ErrorCode.INVALID_INPUT_VALUE);
		}
		if (file.getSize() > maxFileSize) {
			throw new GlobalException(ErrorCode.FILE_TOO_LARGE);
		}

		String contentType = file.getContentType();
		if (!isAllowedImage(file, contentType)) {
			throw new GlobalException(ErrorCode.INVALID_FILE_TYPE);
		}
	}

	private boolean isAllowedImage(MultipartFile file, String contentType) {
		Set<String> imageTypes = Set.of(
				"image/jpeg",
				"image/jpg",
				"image/pjpeg",
				"image/png",
				"image/webp",
				"image/gif"
		);
		if (contentType != null && imageTypes.contains(contentType)) {
			return true;
		}
		return hasAllowedExtension(file.getOriginalFilename());
	}

	private boolean hasAllowedExtension(String filename) {
		if (filename == null || !filename.contains(".")) {
			return false;
		}
		String ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
		return Set.of("jpg", "jpeg", "png", "webp", "gif").contains(ext);
	}

	private String resolveExtension(MultipartFile file) {
		String filename = file.getOriginalFilename();
		if (filename != null && filename.contains(".")) {
			String ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
			return switch (ext) {
				case "png" -> ".png";
				case "webp" -> ".webp";
				case "gif" -> ".gif";
				case "jpeg", "jpg" -> ".jpg";
				default -> ".jpg";
			};
		}

		String contentType = file.getContentType();
		return switch (contentType) {
			case "image/png" -> ".png";
			case "image/webp" -> ".webp";
			case "image/gif" -> ".gif";
			default -> ".jpg";
		};
	}
}
