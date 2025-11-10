"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/user-context';
import { MoveLeft } from 'lucide-react';
//import { useProperty } from '@/contexts/property-context';


interface PropertyDetails {
  id: number;
  title: string;
  price: number;
  status: 'Verified' | 'Pending' | 'Not Verified';
  acres: number;
  landType: string;
  location: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
  features: string[];
  zoning: string;
  utilities: string[];
  access: string;
  terrain: string;
  soilType: string;
  floodZone: boolean;
  owner: {
    name: string;
    phone: string;
    email: string;
    verified: boolean;
  };
  images: string[];
  documents: {
    name: string;
    type: string;
    size: string;
  }[];
  history: {
    date: string;
    event: string;
    description: string;
  }[];
}

const mockProperty: PropertyDetails = {
  id: 1,
  title: "Rural Land in Austin",
  price: 85000,
  status: 'Verified',
  acres: 2.5,
  landType: 'Rural Land',
  location: 'Austin',
  city: 'Austin',
  state: 'TX',
  zipCode: '78701',
  description: "Beautiful rural land located just outside Austin city limits. This property offers excellent potential for residential development or agricultural use. The land features gently rolling terrain with mature trees and natural drainage. Perfect for those looking to build their dream home or start a small farm.",
  features: [
    "Mature oak trees",
    "Natural drainage",
    "Gently rolling terrain",
    "Wildlife habitat",
    "Seasonal creek",
    "Rock outcroppings"
  ],
  zoning: "Agricultural/Residential",
  utilities: [
    "Electricity available at road",
    "Water well possible",
    "Septic system required"
  ],
  access: "Paved road access",
  terrain: "Gently rolling hills",
  soilType: "Clay loam",
  floodZone: false,
  owner: {
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    verified: true
  },
  images: [
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600"
  ],
  documents: [
    { name: "Property Survey", type: "PDF", size: "2.3 MB" },
    { name: "Soil Report", type: "PDF", size: "1.1 MB" },
    { name: "Zoning Certificate", type: "PDF", size: "0.8 MB" }
  ],
  history: [
    { date: "2024-01-15", event: "Listed for Sale", description: "Property listed on LandMarket" },
    { date: "2024-01-10", event: "Survey Completed", description: "Professional land survey completed" },
    { date: "2024-01-05", event: "Soil Testing", description: "Soil analysis and testing completed" }
  ]
};

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const userContext = useUser();
  //const propertyContext = useProperty();

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}k`;
    }
    return `$${price}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Not Verified':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'home' },
    { id: 'details', label: 'Details', icon: 'document' },
    { id: 'documents', label: 'Documents', icon: 'folder' },
    { id: 'history', label: 'History', icon: 'clock' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/browse" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{mockProperty.title}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isSaved
                    ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <svg className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors">
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">Property Image {activeImage + 1}</p>
                  </div>
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setActiveImage(Math.max(0, activeImage - 1))}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImage(Math.min(mockProperty.images.length - 1, activeImage + 1))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {mockProperty.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded-md border-2 transition-colors ${
                        activeImage === index
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                          : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{index + 1}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Information Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex overflow-x-auto space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {tab.icon === 'home' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        )}
                        {tab.icon === 'document' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        )}
                        {tab.icon === 'folder' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
                        )}
                        {tab.icon === 'clock' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                      </svg>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{mockProperty.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mockProperty.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Property Details</h4>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">Zoning</dt>
                            <dd className="text-gray-900 dark:text-white">{mockProperty.zoning}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">Terrain</dt>
                            <dd className="text-gray-900 dark:text-white">{mockProperty.terrain}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">Soil Type</dt>
                            <dd className="text-gray-900 dark:text-white">{mockProperty.soilType}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">Flood Zone</dt>
                            <dd className="text-gray-900 dark:text-white">{mockProperty.floodZone ? 'Yes' : 'No'}</dd>
                          </div>
                        </dl>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Utilities & Access</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Access:</span>
                            <span className="ml-2 text-gray-900 dark:text-white">{mockProperty.access}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Utilities:</span>
                            <ul className="mt-1 space-y-1">
                              {mockProperty.utilities.map((utility, index) => (
                                <li key={index} className="text-gray-900 dark:text-white text-sm">• {utility}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Documents</h3>
                    <div className="space-y-3">
                      {mockProperty.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{doc.type} • {doc.size}</p>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Property History</h3>
                    <div className="space-y-4">
                      {mockProperty.history.map((event, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{event.event}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{event.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {formatPrice(mockProperty.price)}
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  {mockProperty.acres} acres
                </div>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(mockProperty.status)}`}>
                  {mockProperty.status}
                </span>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Location</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">{mockProperty.city}, {mockProperty.state}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{mockProperty.zipCode}</p>
                  </div>
                </div>
                <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                  View on Map
                </button>
              </div>
            </div>

            {/* Owner Contact Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Property Owner</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 dark:text-white font-medium">{mockProperty.owner.name}</span>
                  {mockProperty.owner.verified && (
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call {mockProperty.owner.phone}</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email Owner</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm">
                  Schedule Viewing
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors text-sm">
                  Request Information
                </button>
                <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                  Share Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 