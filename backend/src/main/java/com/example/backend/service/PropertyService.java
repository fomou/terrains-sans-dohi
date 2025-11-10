package com.example.backend.service;


import com.example.backend.dto.FileMetaData;
import com.example.backend.dto.PropertyDTO;
import com.example.backend.entity.Property;
import com.example.backend.entity.User;
import com.example.backend.mapper.PropertyMapper;
import com.example.backend.repository.PropertyRepository;
import com.example.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyMapper propertyMapper;

    @Autowired FileService fileService;

    public List<PropertyDTO> getAll() {
        return propertyRepository.findAll().stream()
            .map(propertyMapper::toDto)
            .collect(Collectors.toList());
    }

    public PropertyDTO getById(String id) {
        Property property = propertyRepository.findById(id).orElseThrow();
        return propertyMapper.toDto(property);
    }

    public PropertyDTO create(PropertyDTO dto) {
        User seller = userRepository.findById(dto.sellerId).orElseThrow();
        User notary = dto.notaryId != null ? userRepository.findById(dto.notaryId).orElse(null) : null;
        Property property = propertyMapper.toEntity(dto, seller, notary);
        property.setCreatedAt(LocalDateTime.now());
        property.setUpdatedAt(LocalDateTime.now());
        property.setVerificationStatus("pending"); // Default status
        property.setPictures("[]"); // Initialize with empty JSON array
        return propertyMapper.toDto(propertyRepository.save(property));
    }

    public PropertyDTO update(String id, PropertyDTO dto) {
        Property existing = propertyRepository.findById(id).orElseThrow();
        User seller = userRepository.findById(dto.sellerId).orElseThrow();
        User notary = dto.notaryId != null ? userRepository.findById(dto.notaryId).orElse(null) : null;
        Property updated = propertyMapper.toEntity(dto, new User(), new User());
        updated.setId(existing.getId());
        updated.setCreatedAt(existing.getCreatedAt());
        updated.setUpdatedAt(LocalDateTime.now());
        return propertyMapper.toDto(propertyRepository.save(updated));
    }

    public void delete(String id) {
        propertyRepository.deleteById(id);
    }

    public Property uploadPropertyPictures(String propertyId, MultipartFile file) throws Exception {

        String filePath = fileService.saveFile(propertyId, file);

        // Update the property entity with the new picture
        Property property = propertyRepository.findById(propertyId).orElseThrow();
        
        String existingPictures = property.getPictures();

        FileMetaData fileMetaData = new FileMetaData();
        fileMetaData.fileName=file.getOriginalFilename();
        fileMetaData.path=filePath;
        fileMetaData.size=file.getSize();
        fileMetaData.contentType = (file.getContentType());

        List<FileMetaData> pictures;
        
        if(existingPictures != null && !existingPictures.isEmpty()) {
            ObjectMapper objectMapper = new ObjectMapper();
            pictures = objectMapper.readValue(existingPictures, new TypeReference<List<FileMetaData>>() {});
        } else {
            pictures = new java.util.ArrayList<>();
        }

        pictures.add(fileMetaData);
        String updatedPictures = new ObjectMapper().writeValueAsString(pictures);
        property.setPictures(updatedPictures);

        property.setUpdatedAt(LocalDateTime.now());
         // TODO Reset verification status on new upload

       return  propertyRepository.save(property);
    }


}
