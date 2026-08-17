import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  states: string[];
  lgas: string[];
  selectedState: string;
  selectedLGA: string;
  onStateChange: (state: string) => void;
  onLGAChange: (lga: string) => void;
}

function LocationSelector({
  states,
  lgas,
  selectedState,
  selectedLGA,
  onStateChange,
  onLGAChange,
}: LocationSelectorProps) {
  return (
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
            onChange={(e) => onStateChange(e.target.value)}
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
            onChange={(e) => onLGAChange(e.target.value)}
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
  );
}

export default LocationSelector;
