package com.example.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "verification_requests")
public class VerificationRequest {
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne
    @JoinColumn(name = "notary_id")
    private User notary;

    private String status; // pending, in_progress, completed, rejected

    @Column(columnDefinition = "jsonb")
    private String documents; // JSON array of documents

    @Column(columnDefinition = "jsonb")
    private String pictures;

    private String notes;
    private LocalDateTime completedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
