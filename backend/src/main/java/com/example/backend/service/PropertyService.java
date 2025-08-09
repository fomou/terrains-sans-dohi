package com.example.backend.service;

import com.example.backend.dto.PropertyDTO;
import com.example.backend.entity.Property;
import com.example.backend.entity.User;
import com.example.backend.mapper.PropertyMapper;
import com.example.backend.repository.PropertyRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyMapper propertyMapper;

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
        //User seller = userRepository.findByEmail(dto.se).orElseThrow();
        //User notary = dto.notaryId != null ? userRepository.findById(dto.notaryId).orElse(null) : null;
        Property property = propertyMapper.toEntity(dto, new User(), new User());
        property.setCreatedAt(LocalDateTime.now());
        property.setUpdatedAt(LocalDateTime.now());
        return propertyMapper.toDto(propertyRepository.save(property));
    }

    public PropertyDTO update(String id, PropertyDTO dto) {
        Property existing = propertyRepository.findById(id).orElseThrow();
        //User seller = userRepository.findById(dto.sellerId).orElseThrow();
        //User notary = dto.notaryId != null ? userRepository.findById(dto.notaryId).orElse(null) : null;
        Property updated = propertyMapper.toEntity(dto, new User(), new User());
        updated.setId(existing.getId());
        updated.setCreatedAt(existing.getCreatedAt());
        updated.setUpdatedAt(LocalDateTime.now());
        return propertyMapper.toDto(propertyRepository.save(updated));
    }

    public void delete(String id) {
        propertyRepository.deleteById(id);
    }
}
