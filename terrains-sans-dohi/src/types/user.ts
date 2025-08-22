export type UserRole = 'BUYER' | 'SELLER' | 'NOTARY';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone?: string;
  company?: string;
  licenseNumber?: string; // For notaries
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Buyer extends User {
  role: 'BUYER';
  savedProperties: string[];
  searchHistory: string[];
  preferences: {
    priceRange: [number, number];
    location: string[];
    landType: string[];
    minAcres: number;
    maxAcres: number;
  };
}

export interface Seller extends User {
  role: 'SELLER';
  company: string;
  properties: string[];
  totalSales: number;
  rating: number;
  verifiedSeller: boolean;
}

export interface Notary extends User {
  role: 'NOTARY';
  licenseNumber: string;
  company: string;
  specializations: string[];
  verificationRequests: string[];
  completedVerifications: number;
  rating: number;
  verifiedNotary: boolean;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  acres: number;
  location: string;
  city: string;
  state: string;
  zipCode: string;
  landType: string;
  features: string[];
  images: string[];
  status: 'active' | 'pending' | 'sold' | 'under_contract';
  verificationStatus: 'pending' | 'verified' | 'rejected';
  sellerId: string;
  notaryId?: string;
  createdAt: Date;
  updatedAt: Date;
   // URLs of images
}

export interface VerificationRequest {
  id: string;
  propertyId: string;
  sellerId: string;
  notaryId?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  documents: {
    name: string;
    type: string;
    url: string;
    uploadedAt: Date;
  }[];
  notes?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
} 