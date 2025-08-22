"use client";
import React, { useState } from 'react';
import { Upload, MapPin, DollarSign, Home, User, CheckCircle, AlertCircle, FileImage } from 'lucide-react';

interface AddPropertyFormData {
  title: string;
  description: string;
  price: string;
  acres: string;
  location: string;
  city: string;
  state: string;
  zipCode: string;
  landType: string;
  status: string;
  verificationStatus: string;
  sellerId: string;
  notaryId: string;
  pictures: File[];
  image?: string[];
}

export default function AddPropertyPage() {
  const [formData, setFormData] = useState<AddPropertyFormData>({
    title: '',
    description: '',
    price: '',
    acres: '',
    location: '',
    city: '',
    state: '',
    zipCode: '',
    landType: 'residential',
    status: 'active',
    verificationStatus: 'pending',
    sellerId: '',
    notaryId: '',
    pictures: []
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const landTypes = [
    { value: 'residential', label: 'Résidentiel' },
    { value: 'agricultural', label: 'Agricole' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industriel' },
    { value: 'recreational', label: 'Loisir' },
    { value: 'forestry', label: 'Forestier' },
    { value: 'vacant', label: 'Terrain Vacant' },
    { value: 'other', label: 'Autre' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Actif' },
    { value: 'pending', label: 'En Attente' },
    { value: 'sold', label: 'Vendu' },
    { value: 'withdrawn', label: 'Retiré' }
  ];

  const verificationOptions = [
    { value: 'pending', label: 'En Attente' },
    { value: 'verified', label: 'Vérifié' },
    { value: 'rejected', label: 'Rejeté' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      pictures: files
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validations des champs requis
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Un prix valide est requis';
    if (!formData.acres || parseFloat(formData.acres) <= 0) newErrors.acres = 'Le nombre d\'acres valide est requis';
    if (!formData.location.trim()) newErrors.location = 'L\'emplacement est requis';
    if (!formData.city.trim()) newErrors.city = 'La ville est requise';
    if (!formData.sellerId || parseInt(formData.sellerId) <= 0) newErrors.sellerId = 'Un ID vendeur valide est requis';

    // Validations de format
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Format de code postal invalide';
    }

    if (formData.price && isNaN(parseFloat(formData.price))) {
      newErrors.price = 'Le prix doit être un nombre valide';
    }

    if (formData.acres && isNaN(parseFloat(formData.acres))) {
      newErrors.acres = 'Le nombre d\'acres doit être un nombre valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProperty = async () => {
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Veuillez corriger les erreurs ci-dessus' });
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      // Récupération du token depuis localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setSubmitStatus({ type: 'error', message: 'Token non trouvé. Veuillez vous reconnecter.' });
        setLoading(false);
        return;
      }

      // Création de FormData pour l'upload de fichiers
      const submitData = new FormData();
      const propertyData = new FormData();
      
      // Ajout de tous les champs du formulaire
      Object.keys(formData).forEach(key => {
        if (key === 'pictures') {
          formData.pictures.forEach(file => {
            submitData.append('pictures', file);
          });
        } else {
          propertyData.append(key, formData[key]);
        }
      });
      submitData.append('property', new Blob([JSON.stringify(Object.fromEntries(propertyData.entries()))], { type: 'application/json' }));

      // Simulation d'appel API (remplacez par votre véritable endpoint)
      console.log(formData);
      const response = await fetch('http://localhost:8280/api/properties/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Ne pas définir Content-Type pour FormData, le navigateur le fera automatiquement
        },
        body: submitData

        
      });

      if (!response.ok) {
        
        throw new Error('Erreur lors de la création de la propriété');
      }

      setSubmitStatus({ type: 'success', message: 'Propriété ajoutée avec succès!' });
      
      // Réinitialiser le formulaire en cas de succès
      setFormData({
        title: '',
        description: '',
        price: '',
        acres: '',
        location: '',
        city: '',
        state: '',
        zipCode: '',
        landType: 'residential',
        status: 'active',
        verificationStatus: 'pending',
        sellerId: '',
        notaryId: '',
        pictures: []
      });

      // Réinitialiser le champ de fichier
      const fileInput = document.getElementById('pictures');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Erreur lors de l\'ajout de la propriété. Veuillez réessayer.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (fieldName) => {
    const baseClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400 transition-colors";
    const errorClass = errors[fieldName] ? "border-red-500" : "border-gray-600";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Ajouter une Propriété</h1>
        <p className="text-gray-300">Remplissez les détails ci-dessous pour lister une nouvelle propriété</p>
      </div>

      {submitStatus && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
          submitStatus.type === 'success' 
            ? 'bg-green-900/50 text-green-300 border border-green-700' 
            : 'bg-red-900/50 text-red-300 border border-red-700'
        }`}>
          {submitStatus.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{submitStatus.message}</span>
        </div>
      )}

      <div className="space-y-8">
        {/* Informations de Base */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Home className="h-5 w-5" />
            Informations de Base
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Titre de la Propriété *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={inputClass('title')}
                placeholder="Belle parcelle de 5 acres avec vue sur montagne"
              />
              {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="landType" className="block text-sm font-medium text-gray-300 mb-2">
                Type de Terrain *
              </label>
              <select
                id="landType"
                name="landType"
                value={formData.landType}
                onChange={handleInputChange}
                className={inputClass('landType')}
              >
                {landTypes.map(type => (
                  <option key={type.value} value={type.value} className="bg-gray-800">
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={inputClass('description')}
              placeholder="Description détaillée de la propriété..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
          </div>
        </div>

        {/* Prix et Taille */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Prix et Taille
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                Prix ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={inputClass('price')}
                placeholder="125000.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-400">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="acres" className="block text-sm font-medium text-gray-300 mb-2">
                Acres *
              </label>
              <input
                type="number"
                id="acres"
                name="acres"
                value={formData.acres}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={inputClass('acres')}
                placeholder="5.25"
              />
              {errors.acres && <p className="mt-1 text-sm text-red-400">{errors.acres}</p>}
            </div>
          </div>
        </div>

        {/* Informations de Localisation */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Informations de Localisation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                Adresse *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={inputClass('location')}
                placeholder="123 Rue de la Montagne"
              />
              {errors.location && <p className="mt-1 text-sm text-red-400">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                Ville *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={inputClass('city')}
                placeholder="Montréal"
              />
              {errors.city && <p className="mt-1 text-sm text-red-400">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-2">
                Province/État
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={inputClass('state')}
                placeholder="QC"
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-2">
                Code Postal
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={inputClass('zipCode')}
                placeholder="H1A 1A1"
              />
              {errors.zipCode && <p className="mt-1 text-sm text-red-400">{errors.zipCode}</p>}
            </div>
          </div>
        </div>

        {/* Statut et Utilisateurs */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Statut et Informations Utilisateur
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={inputClass('status')}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="verificationStatus" className="block text-sm font-medium text-gray-300 mb-2">
                Statut de Vérification
              </label>
              <select
                id="verificationStatus"
                name="verificationStatus"
                value={formData.verificationStatus}
                onChange={handleInputChange}
                className={inputClass('verificationStatus')}
              >
                {verificationOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sellerId" className="block text-sm font-medium text-gray-300 mb-2">
                ID Vendeur *
              </label>
              <input
                type="number"
                id="sellerId"
                name="sellerId"
                value={formData.sellerId}
                onChange={handleInputChange}
                min="1"
                className={inputClass('sellerId')}
                placeholder="12345"
              />
              {errors.sellerId && <p className="mt-1 text-sm text-red-400">{errors.sellerId}</p>}
            </div>

            <div>
              <label htmlFor="notaryId" className="block text-sm font-medium text-gray-300 mb-2">
                ID Notaire
              </label>
              <input
                type="number"
                id="notaryId"
                name="notaryId"
                value={formData.notaryId}
                onChange={handleInputChange}
                min="1"
                className={inputClass('notaryId')}
                placeholder="67890"
              />
            </div>
          </div>
        </div>

        {/* Upload d'Images */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileImage className="h-5 w-5" />
            Photos de la Propriété
          </h2>
          
          <div>
            <label htmlFor="pictures" className="block text-sm font-medium text-gray-300 mb-2">
              Télécharger des Images
            </label>
            <input
              type="file"
              id="pictures"
              name="pictures"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
            />
            <p className="mt-1 text-sm text-gray-400">Sélectionnez plusieurs images pour présenter votre propriété</p>
            {formData.pictures.length > 0 && (
              <p className="mt-2 text-sm text-green-400">
                {formData.pictures.length} fichier(s) sélectionné(s)
              </p>
            )}
          </div>
        </div>

        {/* Bouton de Soumission */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddProperty}
            disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Ajout en cours...' : 'Ajouter la Propriété'}
          </button>
        </div>
      </div>
    </div>
  );
}