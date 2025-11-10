"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types/user';

interface VerificationStatus {
  verified: boolean;
  pending: boolean;
  notVerified: boolean;
}

export default function BrowsePage() {
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 50]);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    verified: false,
    pending: false,
    notVerified: false
  });
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [listings, setListings] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    async function fetchListings() {
      try {
        const response = await fetch('http://localhost:8280/api/properties');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListings();
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}k`;
    }
    return `$${price.toLocaleString()}`;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">TerrainsSansDohi</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filters</span>
            </button>
          </div>
          
          {/* Mobile Search Bar */}
          <div className="mt-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search by location, city, or postal code..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">LandMarket</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search by location, city, or postal code..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex space-x-4">
              <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>All Prices</option>
                <option>$0 - $50k</option>
                <option>$50k - $100k</option>
                <option>$100k - $200k</option>
                <option>$200k+</option>
              </select>
              <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>All Sizes</option>
                <option>0-1 acres</option>
                <option>1-5 acres</option>
                <option>5-10 acres</option>
                <option>10+ acres</option>
              </select>
              <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>All Status</option>
                <option>Verified</option>
                <option>Pending</option>
                <option>Not Verified</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowFilters(false)}>
              <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4 overflow-y-auto h-full">
                  <FiltersContent
                    location={location}
                    setLocation={setLocation}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    surfaceRange={surfaceRange}
                    setSurfaceRange={setSurfaceRange}
                    verificationStatus={verificationStatus}
                    setVerificationStatus={setVerificationStatus}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar - Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <FiltersContent
                location={location}
                setLocation={setLocation}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                surfaceRange={surfaceRange}
                setSurfaceRange={setSurfaceRange}
                verificationStatus={verificationStatus}
                setVerificationStatus={setVerificationStatus}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Interactive Map View */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg h-48 sm:h-64 flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-500 mb-2 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">Interactive Map View</p>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                {listings.length} Properties Found
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
                <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Oldest First</option>
                </select>
              </div>
            </div>

            {/* Land Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Land Photo */}
                  {listing.images && listing.images.length > 0 ? (
                    <img
                      src={`http://localhost:8280${listing.images[0]}`}
                      alt={`Property ${listing.id}`}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                  ) : (
                    <div className="h-40 sm:h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">No Image</p>
                      </div>
                    </div>
                  )}

                  {/* Listing Details */}
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{formatPrice(listing.price)}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {listing.acres} acres • {listing.landType}
                    </p>
                    
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 sm:mb-4">
                      {listing.city}, {listing.state} {listing.zipCode}
                    </p>
                    
                    <Link href={`/property/${listing.id}`} className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-sm sm:text-base text-center">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {listings.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No properties found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
              </div>
            )}

            {/* Load More Button */}
            {listings.length > 0 && (
              <div className="mt-6 sm:mt-8 text-center">
                <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors">
                  Load More Properties
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Filters Component
function FiltersContent({
  location,
  setLocation,
  priceRange,
  setPriceRange,
  surfaceRange,
  setSurfaceRange,
  verificationStatus,
  setVerificationStatus
}: {
  location: string;
  setLocation: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  surfaceRange: number[];
  setSurfaceRange: (value: number[]) => void;
  verificationStatus: VerificationStatus;
  setVerificationStatus: (value: VerificationStatus) => void;
}) {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Filters</h2>
      
      {/* Location */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
        <input
          type="text"
          placeholder="City or postal code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Price Range */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1] >= 500000 ? '500k+' : priceRange[1].toLocaleString()}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="500000"
            step="10000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>$0</span>
            <span>$500k+</span>
          </div>
        </div>
      </div>

      {/* Surface Area */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Surface Area (acres): {surfaceRange[0]} - {surfaceRange[1] >= 50 ? '50+' : surfaceRange[1]}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={surfaceRange[1]}
            onChange={(e) => setSurfaceRange([surfaceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>0</span>
            <span>50+</span>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Verification Status</label>
        <div className="space-y-2">
          {Object.entries(verificationStatus).map(([key, checked]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setVerificationStatus({
                  ...verificationStatus,
                  [key]: e.target.checked
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                {key === 'notVerified' ? 'Not Verified' : key}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors">
        Apply Filters
      </button>
    </>
  );
}