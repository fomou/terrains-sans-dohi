"use client";

import React, { use, useState } from "react";
import Link from "next/link";
// import { useUser } from "@/contexts/UserContext"; // Removed
import { UserRole } from "@/types/user";
import { useUser } from "@/contexts/user-context";

export default function SignupPage() {
  // const { register } = useUser(); // Removed

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "BUYER" as UserRole,
    phone: "",
    company: "",
    licenseNumber: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userContext = useUser()

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    // Role-specific validation
    if (formData.role === 'SELLER' && !formData.company.trim()) {
      newErrors.company = "Le nom de l'entreprise est requis pour les vendeurs";
    }

    if (formData.role === 'NOTARY') {
      if (!formData.company.trim()) {
        newErrors.company = "Le nom de l'entreprise est requis pour les notaires";
      }
      if (!formData.licenseNumber.trim()) {
        newErrors.licenseNumber = "Le numéro de licence est requis pour les notaires";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Dummy register function for now


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const success = await userContext.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        licenseNumber: formData.licenseNumber || undefined
      });

      if (success) {
        console.log(userContext.user);
        // Redirect based on role
        const redirectPath = formData.role === 'BUYER' ? '/browse' : 
                           formData.role === 'SELLER' ? '/seller/dashboard' : 
                           '/notary/dashboard';
        window.location.href = redirectPath;
      } else {
        alert("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'BUYER':
        return "Parcourez et achetez des terrains vérifiés";
      case 'SELLER':
        return "Vendez vos terrains avec vérification notariale";
      case 'NOTARY':
        return "Fournissez des services de vérification notariale";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - Branding */}
      <div className="w-full lg:w-1/2 bg-gray-900 text-white flex flex-col justify-center items-center p-6 md:p-12">
        <div className="max-w-md text-center">
          <div className="bg-white text-black font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg mb-6 md:mb-8 inline-block">
            LandMarket
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
            Rejoignez Notre<br />Communauté
          </h1>
          <p className="text-gray-300 mb-8 md:mb-12 text-base md:text-lg leading-relaxed">
            Créez votre compte et accédez à des milliers de terrains 
            vérifiés avec des transactions sécurisées.
          </p>

          <div className="flex justify-center space-x-6 md:space-x-12">
            <div className="text-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">10K+</p>
              <p className="text-gray-400 text-xs md:text-sm mt-1">Proprietés</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">5K+</p>
              <p className="text-gray-400 text-xs md:text-sm mt-1">Investisseurs</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">99%</p>
              <p className="text-gray-400 text-xs md:text-sm mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 bg-gray-900 text-white flex flex-col justify-center px-6 md:px-12 lg:px-16">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Créer un compte</h2>
          <p className="text-gray-400 mb-6 md:mb-8">Commencez votre parcours d&apos;investissement</p>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Type de compte
              </label>
              <div className="grid grid-cols-1 gap-3">
                {(['BUYER', 'SELLER', 'NOTARY'] as UserRole[]).map((role) => (
                  <label
                    key={role}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.role === role
                        ? 'border-blue-500 bg-blue-900 bg-opacity-20'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.role === role
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-600'
                      }`}>
                        {formData.role === role && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium capitalize">
                          {role === 'BUYER' ? 'Acheteur' : role === 'SELLER' ? 'Vendeur' : 'Notaire'}
                        </div>
                        <div className="text-sm text-gray-400">
                          {getRoleDescription(role)}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Champs Prénom/Nom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  Prénom
                </label>
                <div className="relative">
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.firstName 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500"
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Nom
                </label>
                <div className="relative">
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.lastName 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500"
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Adresse e-mail
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                    errors.email 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-700 focus:border-gray-500 focus:ring-gray-500"
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Téléphone (optionnel)
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Company (for sellers and notaries) */}
            {(formData.role === 'SELLER' || formData.role === 'NOTARY') && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Nom de l'entreprise {formData.role === 'NOTARY' ? '*' : '*'}
                </label>
                <div className="relative">
                  <input
                    id="company"
                    type="text"
                    placeholder={formData.role === 'SELLER' ? "Nom de votre entreprise" : "Nom de votre cabinet"}
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.company 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500"
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
              </div>
            )}

            {/* License Number (for notaries) */}
            {formData.role === 'NOTARY' && (
              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-300 mb-2">
                  Numéro de licence notariale *
                </label>
                <div className="relative">
                  <input
                    id="licenseNumber"
                    type="text"
                    placeholder="Numéro de licence"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.licenseNumber 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                        : "border-gray-700 focus:border-gray-500 focus:ring-gray-500"
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                {errors.licenseNumber && <p className="text-red-400 text-xs mt-1">{errors.licenseNumber}</p>}
              </div>
            )}

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Créez un mot de passe"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                    errors.password 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-700 focus:border-gray-500 focus:ring-gray-500"
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirmer le mot de passe */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                    errors.confirmPassword 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-700 focus:border-gray-500 focus:ring-gray-500"
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Création en cours..." : "Créer mon compte"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-700" />
            <span className="mx-4 text-gray-500 text-sm">Ou inscrivez-vous avec</span>
            <hr className="flex-1 border-gray-700" />
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
            <button className="flex-1 bg-gray-800 border border-gray-700 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </button>
            <button className="flex-1 bg-gray-800 border border-gray-700 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm">
            Vous avez déjà un compte?{" "}
            <Link href="/login" className="text-white hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
