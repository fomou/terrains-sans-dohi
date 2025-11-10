package com.example.backend.repository;

import com.example.backend.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, String> {
    // Additional query methods can be defined here if needed
    // For example, find properties by status, location, etc.
    List<Property> findByStatus(String status);
    List<Property> findByCity(String city);
    List<Property> findBySellerId(Integer sellerId);
    List<Property> findByNotaryId(Integer notaryId);
    List<Property> findByLocationContaining(String location);
    List<Property> findByLandType(String landType);
    List<Property> findByVerificationStatus(String verificationStatus);
    List<Property> findByPriceBetween(Double minPrice, Double maxPrice);
    List<Property> findByAcresBetween(Double minAcres, Double maxAcres);
    String findPicturesById(String id);
}
