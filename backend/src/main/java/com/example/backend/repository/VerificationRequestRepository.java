package com.example.backend.repository;

import com.example.backend.entity.VerificationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationRequestRepository extends JpaRepository<VerificationRequest, String> {}
