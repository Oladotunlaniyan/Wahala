import { useState } from 'react';
import { Phone, MapPin, AlertTriangle } from 'lucide-react';
import Navbar from './components/Navbar';
import emergencyData from './data'


function App() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');

  const states = Object.keys(emergencyData);
  const lgas = selectedState ? Object.keys(emergencyData[selectedState]) : [];
  const contacts = selectedState && selectedLGA ? emergencyData[selectedState][selectedLGA] : null;

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedLGA(''); // Reset LGA when state changes
  };

  const getServiceIcon = (service: string) => {
    if (service.toLowerCase().includes('police')) {
      return '🚔';
    } else if (service.toLowerCase().includes('fire')) {
      return '🚒';
    } else if (service.toLowerCase().includes('ambulance')) {
      return '🚑';
    }
    return '📞';
  };

  const getServiceColor = (service: string) => {
    if (service.toLowerCase().includes('police')) {
      return 'border-blue-200 bg-blue-50';
    } else if (service.toLowerCase().includes('fire')) {
      return 'border-red-200 bg-red-50';
    } else if (service.toLowerCase().includes('ambulance')) {
      return 'border-green-200 bg-green-50';
    }
    return 'border-gray-200 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full mr-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Nigeria Emergency Contacts
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Quick access to emergency services across Nigerian states
          </p>
        </div>

        {/* Selection Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* State Selection */}
            <div>
              <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Select State
              </label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="">Choose a state...</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* LGA Selection */}
            <div>
              <label htmlFor="lga" className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Select LGA
              </label>
              <select
                id="lga"
                value={selectedLGA}
                onChange={(e) => setSelectedLGA(e.target.value)}
                disabled={!selectedState}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {selectedState ? 'Choose an LGA...' : 'Select a state first'}
                </option>
                {lgas.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        {contacts && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Emergency Contacts for {selectedLGA}, {selectedState}
            </h2>
            
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
              {Object.entries(contacts).map(([service, phone]) => (
                <div
                  key={service}
                  className={`border-2 rounded-xl p-6 transition-all hover:shadow-md ${getServiceColor(service)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">
                        {getServiceIcon(service)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {service}
                        </h3>
                        <p className="text-gray-600">
                          {selectedLGA} {service}
                        </p>
                        <p className="text-lg font-semibold text-gray-800 mt-1">
                          {phone}
                        </p>
                      </div>
                    </div>
                    
                    <a
                      href={`tel:${phone}`}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedState && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Select Your Location
            </h3>
            <p className="text-gray-500">
              Choose your state and LGA to view emergency contacts
            </p>
          </div>
        )}

        {selectedState && !selectedLGA && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Select Your LGA
            </h3>
            <p className="text-gray-500">
              Choose your Local Government Area to view emergency contacts
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            🚨 For immediate emergencies, dial the numbers above directly
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Keep this app accessible for quick emergency contact lookup
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;