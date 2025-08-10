package com.example.backend.mapper;

import com.example.backend.dto.PropertyDTO;

import com.example.backend.entity.Property;
import com.example.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class PropertyMapper {
    public PropertyDTO toDto(Property property) {
        PropertyDTO dto = new PropertyDTO();
        dto.id = property.getId();
        dto.title = property.getTitle();
        dto.description = property.getDescription();
        dto.price = property.getPrice();
        dto.acres = property.getAcres();
        dto.location = property.getLocation();
        dto.city = property.getCity();
        dto.landType = property.getLandType();
        dto.status = property.getStatus();
        dto.verificationStatus = property.getVerificationStatus();
        dto.sellerId = property.getSeller() != null ? property.getSeller().getId() : null;
        dto.notaryId = property.getNotary() != null ? property.getNotary().getId() : null;
        dto.createdAt = property.getCreatedAt();
        dto.updatedAt = property.getUpdatedAt();
        return dto;
    }

    public Property toEntity(PropertyDTO dto, User seller, User notary) {
        Property property = new Property();
        property.setId(dto.id);
        property.setTitle(dto.title);
        property.setDescription(dto.description);
        property.setPrice(dto.price);
        property.setAcres(dto.acres);
        property.setLocation(dto.location);
        property.setCity(dto.city);
        property.setLandType(dto.landType);
        property.setStatus(dto.status);
        property.setVerificationStatus(dto.verificationStatus);
        property.setSeller(seller);
        property.setNotary(notary);
        property.setCreatedAt(dto.createdAt);
        property.setUpdatedAt(dto.updatedAt);
        return property;
    }
}
