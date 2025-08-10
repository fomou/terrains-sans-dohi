package com.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import jakarta.mail.Multipart;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {



  private final Path storagePath;
  

    public FileService(@Value("${storage.upload-dir}") String path) throws Exception {

        this.storagePath = Paths.get(path).toAbsolutePath().normalize();
        if (!Files.exists(storagePath)) {
        Files.createDirectories(storagePath);
        }
    }
  

  public Path getStoragePath() {
    return storagePath;
  }
  public String saveFile(String propertyID, MultipartFile file) throws Exception {
    Path propertyPath = storagePath.resolve(propertyID);
    if (!Files.exists(propertyPath)) {
      Files.createDirectories(propertyPath);
    }

    String fileName = propertyID+"_"+file.getOriginalFilename();
    Path target = storagePath.resolve(fileName);
    Files.copy(file.getInputStream(), target);

    return target.toString(); // Full path
  }

}
