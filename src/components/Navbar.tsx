import { useState, useEffect } from 'react';
import { X, Phone, MapPin, Loader2, Map, Save, Clock, ArrowLeft, AlertTriangle } from 'lucide-react';
import { emergencyContacts } from '../data';
// Import your emergency data - adjust the import path as needed
import emergencyData from '../data';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [localEmergencyContacts, setLocalEmergencyContacts] = useState(null);

  // Load saved locations on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedLocations') || '[]');
    setSavedLocations(saved);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);
  const openMapModal = () => setIsMapModalOpen(true);
  const closeMapModal = () => setIsMapModalOpen(false);

  // function to go back from map to location modal
  const goBackToLocationModal = () => {
    closeMapModal();
    openLocationModal();
  };

  // Function to find matching emergency contacts based on location
  const findLocalEmergencyContacts = (address, rawAddress) => {
  if (!address || !emergencyData) return null;

  const addressLower = address.toLowerCase();
  const state = rawAddress?.state || '';
  const city = rawAddress?.city || rawAddress?.town || rawAddress?.village || '';
  const lga = rawAddress?.county || rawAddress?.state_district || '';

  // Create state mapping for better matching
  const stateMapping = {
    'federal capital territory': 'Federal Capital Territory',
    'abuja': 'Federal Capital Territory',
    'fct': 'Federal Capital Territory',
    'lagos': 'Lagos',
    'lagos state': 'Lagos',
    'kano': 'Kano',
    'kano state': 'Kano',
    'rivers': 'Rivers',
    'rivers state': 'Rivers',
    'abia': 'Abia',
    'abia state': 'Abia',
    'adamawa': 'Adamawa',
    'adamawa state': 'Adamawa',
    'akwa ibom': 'Akwa Ibom',
    'akwa ibom state': 'Akwa Ibom',
    'anambra': 'Anambra',
    'anambra state': 'Anambra',
    'bauchi': 'Bauchi',
    'bauchi state': 'Bauchi',
    'bayelsa': 'Bayelsa',
    'bayelsa state': 'Bayelsa',
    'benue': 'Benue',
    'benue state': 'Benue',
    'borno': 'Borno',
    'borno state': 'Borno',
    'cross river': 'Cross River',
    'cross river state': 'Cross River',
    'delta': 'Delta',
    'delta state': 'Delta',
    'ebonyi': 'Ebonyi',
    'ebonyi state': 'Ebonyi',
    'edo': 'Edo',
    'edo state': 'Edo',
    'ekiti': 'Ekiti',
    'ekiti state': 'Ekiti',
    'enugu': 'Enugu',
    'enugu state': 'Enugu',
    'gombe': 'Gombe',
    'gombe state': 'Gombe',
    'imo': 'Imo',
    'imo state': 'Imo',
    'jigawa': 'Jigawa',
    'jigawa state': 'Jigawa',
    'kaduna': 'Kaduna',
    'kaduna state': 'Kaduna',
    'katsina': 'Katsina',
    'katsina state': 'Katsina',
    'kebbi': 'Kebbi',
    'kebbi state': 'Kebbi',
    'kogi': 'Kogi',
    'kogi state': 'Kogi',
    'kwara': 'Kwara',
    'kwara state': 'Kwara',
    'nasarawa': 'Nasarawa',
    'nasarawa state': 'Nasarawa',
    'niger': 'Niger',
    'niger state': 'Niger',
    'ogun': 'Ogun',
    'ogun state': 'Ogun',
    'ondo': 'Ondo',
    'ondo state': 'Ondo',
    'osun': 'Osun',
    'osun state': 'Osun',
    'oyo': 'Oyo',
    'oyo state': 'Oyo',
    'plateau': 'Plateau',
    'plateau state': 'Plateau',
    'sokoto': 'Sokoto',
    'sokoto state': 'Sokoto',
    'taraba': 'Taraba',
    'taraba state': 'Taraba',
    'yobe': 'Yobe',
    'yobe state': 'Yobe',
    'zamfara': 'Zamfara',
    'zamfara state': 'Zamfara'
  };

  // Try to match state using mapping
  let matchedState = null;
  let matchedLGA = null;

  // Check state from API response first
  const stateLower = state.toLowerCase();
  if (stateMapping[stateLower]) {
    matchedState = stateMapping[stateLower];
  }

  // If no match from API state, try to match from full address
  if (!matchedState) {
    for (const [key, value] of Object.entries(stateMapping)) {
      if (addressLower.includes(key)) {
        matchedState = value;
        break;
      }
    }
  }

  // Special handling for Abuja/FCT
  if (!matchedState && (
    addressLower.includes('abuja') || 
    addressLower.includes('federal capital territory') || 
    addressLower.includes('fct')
  )) {
    matchedState = 'Federal Capital Territory';
  }

  // If state is found, try to match LGA/Area
  if (matchedState && emergencyData[matchedState]) {
    const areas = Object.keys(emergencyData[matchedState]);
    
    // Try to match city/area names
    for (const area of areas) {
      if (city.toLowerCase().includes(area.toLowerCase()) ||
          lga.toLowerCase().includes(area.toLowerCase()) ||
          addressLower.includes(area.toLowerCase())) {
        matchedLGA = area;
        break;
      }
    }

    // Special handling for Abuja areas
    if (matchedState === 'Federal Capital Territory' && !matchedLGA) {
      // Check for specific Abuja areas
      const abujaAreas = ['garki', 'wuse', 'maitama', 'karu'];
      for (const abujaArea of abujaAreas) {
        if (addressLower.includes(abujaArea)) {
          matchedLGA = abujaArea.charAt(0).toUpperCase() + abujaArea.slice(1);
          break;
        }
      }
      
      // Default to Abuja if no specific area found
      if (!matchedLGA && areas.includes('Abuja')) {
        matchedLGA = 'Abuja';
      }
    }

    // Return contacts if both state and LGA are found
    if (matchedLGA && emergencyData[matchedState][matchedLGA]) {
      return {
        state: matchedState,
        lga: matchedLGA,
        contacts: emergencyData[matchedState][matchedLGA]
      };
    }

    // If only state is found, return first available LGA contacts as fallback
    const firstLGA = areas[0];
    if (firstLGA) {
      return {
        state: matchedState,
        lga: firstLGA,
        contacts: emergencyData[matchedState][firstLGA],
        isFallback: true
      };
    }
  }

  console.log('No match found for:', { state: stateLower, city, address: addressLower });
  return null;
};
  // Function to get service icon
  const getServiceIcon = (service) => {
    if (service.toLowerCase().includes('police')) {
      return '🚔';
    } else if (service.toLowerCase().includes('fire')) {
      return '🚒';
    } else if (service.toLowerCase().includes('ambulance')) {
      return '🚑';
    }
    return '📞';
  };

  // Function to get service color
  const getServiceColor = (service) => {
    if (service.toLowerCase().includes('police')) {
      return 'border-blue-200 bg-blue-50';
    } else if (service.toLowerCase().includes('fire')) {
      return 'border-red-200 bg-red-50';
    } else if (service.toLowerCase().includes('ambulance')) {
      return 'border-green-200 bg-green-50';
    }
    return 'border-gray-200 bg-gray-50';
  };

  const getLocation = async () => {
    setIsLoadingLocation(true);
    setLocationError('');
    setLocalEmergencyContacts(null);
    
    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      // Get current position
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Reverse geocoding using OpenStreetMap's Nominatim API (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error('Failed to get address information');
      }
      const data = await response.json();
      // address format 
      const address = data.address || {};
      const formattedAddress = [
        address.house_number,
        address.road,
        address.neighbourhood || address.suburb,
        address.city || address.town || address.village,
        address.state,
        address.country
      ].filter(Boolean).join(', ');

      const newLocationData = {
        id: Date.now(),
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
        address: formattedAddress || data.display_name,
        rawAddress: address,
        timestamp: new Date().toLocaleString()
      };

      setLocationData(newLocationData);

      // Find local emergency contacts
      const emergencyInfo = findLocalEmergencyContacts(formattedAddress, address);
      setLocalEmergencyContacts(emergencyInfo);
      
      // Open location modal when location is found
      openLocationModal();

    } catch (error) {
      console.error('Error getting location:', error);
      setLocationError(
        error.message === 'User denied the request for Geolocation.' 
          ? 'Location access denied. Please enable location permissions and try again.'
          : error.message || 'Unable to get your location. Please try again.'
      );
      
      // Open location modal to show error
      openLocationModal();
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const saveLocation = () => {
    if (!locationData) return;
    
    const newSavedLocation = {
      ...locationData,
      savedAt: new Date().toLocaleString(),
      name: `Location ${savedLocations.length + 1}`,
      emergencyContacts: localEmergencyContacts
    };
    
    const updatedSavedLocations = [...savedLocations, newSavedLocation];
    setSavedLocations(updatedSavedLocations);
    localStorage.setItem('savedLocations', JSON.stringify(updatedSavedLocations));
    
    // Show success message (I might add a toast here)
    alert('Location saved successfully!');
  };

  const loadSavedLocation = (savedLocation) => {
    setLocationData(savedLocation);
    setLocalEmergencyContacts(savedLocation.emergencyContacts || null);
    openLocationModal();
  };

  const deleteSavedLocation = (locationId) => {
    const updatedSavedLocations = savedLocations.filter(loc => loc.id !== locationId);
    setSavedLocations(updatedSavedLocations);
    localStorage.setItem('savedLocations', JSON.stringify(updatedSavedLocations));
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between px-8 py-4">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-red-600">
          Wahala
        </div>
        
        {/* Right: Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={openModal}
            className="border px-4 py-2 rounded hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
          >
            <Phone size={18} />
            General Emergency Contacts
          </button>
          
          <button 
            onClick={getLocation}
            disabled={isLoadingLocation}
            className="px-4 py-2 rounded text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 transition-colors duration-200 flex items-center gap-2"
          >
            <MapPin size={18} />
            {isLoadingLocation ? 'Getting Location...' : 'Find your location'}
          </button>
        </div>
      </nav>

      {/* Saved Locations Display - Only show when no modals are open */}
      {savedLocations.length > 0 && !isLocationModalOpen && !isMapModalOpen && !isModalOpen && (
        <div className="mx-8 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-800 mb-3">
              <Clock size={20} />
              <span className="font-semibold">Saved Locations ({savedLocations.length})</span>
            </div>
            <div className="space-y-2">
              {savedLocations.slice(-3).map((savedLocation) => (
                <div key={savedLocation.id} className="bg-white rounded p-3 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-blue-800">{savedLocation.name}</div>
                      <div className="text-xs text-blue-600 truncate">{savedLocation.address}</div>
                      <div className="text-xs text-blue-500">Saved: {savedLocation.savedAt}</div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => loadSavedLocation(savedLocation)}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteSavedLocation(savedLocation.id)}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Location Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MapPin className={locationError ? "text-red-600" : "text-green-600"} size={24} />
                {locationError ? 'Location Error' : 'Your Location'}
              </h2>
              <button 
                onClick={closeLocationModal}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Location Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {locationError ? (
                <div className="text-center">
                  <div className="text-red-600 mb-4">
                    <MapPin size={48} className="mx-auto mb-2" />
                    <h3 className="text-lg font-semibold mb-2">Unable to Get Location</h3>
                    <p className="text-red-700">{locationError}</p>
                  </div>
                  <button 
                    onClick={() => {
                      closeLocationModal();
                      getLocation();
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : locationData ? (
                <div className="space-y-6">
                  {/* Address Display */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Address</h3>
                    <p className="text-green-700">{locationData.address}</p>
                  </div>
                  
                  {/* Emergency Contacts Section */}
                  {localEmergencyContacts ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="text-red-600" size={20} />
                        <h3 className="font-semibold text-red-800">
                          Local Emergency Contacts
                          {localEmergencyContacts.isFallback && (
                            <span className="text-sm font-normal text-red-600 ml-2">
                              (Nearest available)
                            </span>
                          )}
                        </h3>
                      </div>
                      <div className="text-sm text-red-700 mb-3">
                        {localEmergencyContacts.lga}, {localEmergencyContacts.state}
                      </div>
                      <div className="space-y-3">
                        {Object.entries(localEmergencyContacts.contacts).map(([service, phone]) => (
                          <div
                            key={service}
                            className={`border rounded-lg p-3 ${getServiceColor(service)}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{getServiceIcon(service)}</span>
                                <div>
                                  <div className="font-semibold text-gray-800">{service}</div>
                                  <div className="text-sm text-gray-600">{phone}</div>
                                </div>
                              </div>
                              <a
                                href={`tel:${phone}`}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold transition-colors flex items-center gap-1"
                              >
                                <Phone size={14} />
                                Call
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                      {localEmergencyContacts.isFallback && (
                        <div className="mt-3 text-xs text-red-600">
                          * These are the nearest available emergency contacts for your state. 
                          For more precise local contacts, use the main emergency contacts feature.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="text-yellow-600" size={20} />
                        <h3 className="font-semibold text-yellow-800">Emergency Contacts</h3>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        Unable to automatically find local emergency contacts for this location. 
                        Use the <strong>"General Emergency Contacts"</strong>button for nationwide emergency numbers,
                        or manually select your state and LGA in the main interface.
                      </p>
                    </div>
                  )}
                  
                  {/* Coordinates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 text-sm">Latitude</h4>
                      <p className="text-gray-700 font-mono">{locationData.latitude}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 text-sm">Longitude</h4>
                      <p className="text-gray-700 font-mono">{locationData.longitude}</p>
                    </div>
                  </div>
                  
                  {/* Timestamp */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-800">
                      <Clock size={16} />
                      <span className="text-sm font-medium">Retrieved: {locationData.timestamp}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => navigator.clipboard.writeText(locationData.address)}
                      className="bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      Copy Address
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(`${locationData.latitude}, ${locationData.longitude}`)}
                      className="bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      Copy Coordinates
                    </button>
                    <button
                      onClick={() => {
                        closeLocationModal();
                        openMapModal();
                      }}
                      className="bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <Map size={16} />
                      View Map
                    </button>
                    <button
                      onClick={saveLocation}
                      className="bg-orange-600 text-white py-2 px-3 rounded hover:bg-orange-700 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <Save size={16} />
                      Save Location
                    </button>
                  </div>
                  
                  {/* External Links */}
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">External Maps</h4>
                    <div className="flex gap-2">
                      <a
                        href={`https://maps.google.com/?q=${locationData.latitude},${locationData.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition-colors text-sm text-center"
                      >
                        Google Maps
                      </a>
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${locationData.latitude}&mlon=${locationData.longitude}&zoom=16`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition-colors text-sm text-center"
                      >
                        OpenStreetMap
                      </a>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {isMapModalOpen && locationData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Map Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <button 
                  onClick={goBackToLocationModal}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center gap-1 text-sm font-medium"
                >
                  <ArrowLeft size={18} />
                  Back to Location
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Map className="text-blue-600" size={24} />
                  Location Map
                </h2>
              </div>
              <button 
                onClick={closeMapModal}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Map Content */}
            <div className="p-4">
              <div className="mb-4 bg-gray-50 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-800 mb-1">Current Location:</div>
                <div className="text-sm text-gray-600">{locationData.address}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {locationData.latitude}, {locationData.longitude}
                </div>
              </div>
              
              {/* Embedded Map using OpenStreetMap */}
              <div className="w-full h-96 border rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(locationData.longitude) - 0.01},${parseFloat(locationData.latitude) - 0.01},${parseFloat(locationData.longitude) + 0.01},${parseFloat(locationData.latitude) + 0.01}&layer=mapnik&marker=${locationData.latitude},${locationData.longitude}`}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  title="Location Map"
                />
              </div>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={goBackToLocationModal}
                  className="text-sm bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-1"
                >
                  <ArrowLeft size={16} />
                  Back to Location
                </button>
                <a
                  href={`https://maps.google.com/?q=${locationData.latitude},${locationData.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Open in Google Maps
                </a>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${locationData.latitude}&mlon=${locationData.longitude}&zoom=16`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Open in OpenStreetMap
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(`${locationData.latitude}, ${locationData.longitude}`)}
                  className="text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Copy Coordinates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Phone className="text-red-600" size={24} />
                General Emergency Contacts
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Important Notice */}
              <div className="mt-6 mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Important Notice:</h4>
                <p className="text-red-700 text-sm">
                  In case of life-threatening emergencies, call <strong className='text-lg'>199 or 112</strong> immediately. 
                  Keep these numbers saved in your phone for quick access during emergencies, they are toll-free.
                </p>
              </div>

              <div className="grid gap-6">
                {emergencyContacts.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                      {category.category}
                    </h3>
                    <div className="grid gap-3">
                      {category.contacts.map((contact, contactIndex) => (
                        <div key={contactIndex} className="bg-white rounded-lg p-4 shadow-sm border">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                            <div className="flex items-center gap-2">
                              <Phone size={16} className="text-red-600" />
                              <a 
                                href={`tel:${contact.number}`}
                                className="text-red-600 font-bold text-lg hover:text-red-700 transition-colors duration-200"
                              >
                                {contact.number}
                              </a>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{contact.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;