import { useState, FormEvent } from 'react';
import { X, MapPin, Phone, Shield } from 'lucide-react';

export interface NewContactData {
  state: string;
  lga: string;
  service: string;
  phone: string;
}

interface AddContactModalProps {
  states: string[];
  lgasByState: Record<string, string[]>;
  onClose: () => void;
  onSubmit: (data: NewContactData) => void;
}

const SERVICE_OPTIONS = ['Police', 'Fire Service', 'Ambulance', 'Other'];
const PHONE_PATTERN = /^(\+234|0)[7-9][0-1]\d{8}$/;

function AddContactModal({ states, lgasByState, onClose, onSubmit }: AddContactModalProps) {
  const [state, setState] = useState('');
  const [customState, setCustomState] = useState('');
  const [lga, setLga] = useState('');
  const [service, setService] = useState('');
  const [customService, setCustomService] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const isNewState = state === '__new__';
  const finalState = isNewState ? customState.trim() : state;
  const finalService = service === 'Other' ? customService.trim() : service;
  const lgaSuggestions = state && !isNewState ? lgasByState[state] ?? [] : [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!finalState) {
      setError('Please select or enter a state.');
      return;
    }
    if (!lga.trim()) {
      setError('Please enter an LGA.');
      return;
    }
    if (!finalService) {
      setError('Please select or enter a service type.');
      return;
    }
    if (!PHONE_PATTERN.test(phone.trim())) {
      setError('Enter a valid Nigerian phone number, e.g. 08012345678.');
      return;
    }

    onSubmit({
      state: finalState,
      lga: lga.trim(),
      service: finalService,
      phone: phone.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add Emergency Contact</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* State */}
          <div>
            <label htmlFor="new-state" className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              State
            </label>
            <select
              id="new-state"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setLga('');
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            >
              <option value="">Choose a state...</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
              <option value="__new__">+ Add a new state</option>
            </select>
            {isNewState && (
              <input
                type="text"
                value={customState}
                onChange={(e) => setCustomState(e.target.value)}
                placeholder="Enter state name"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            )}
          </div>

          {/* LGA */}
          <div>
            <label htmlFor="new-lga" className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              LGA
            </label>
            <input
              id="new-lga"
              type="text"
              list="lga-suggestions"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              placeholder="Enter LGA name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
            <datalist id="lga-suggestions">
              {lgaSuggestions.map((l) => (
                <option key={l} value={l} />
              ))}
            </datalist>
          </div>

          {/* Service */}
          <div>
            <label htmlFor="new-service" className="block text-sm font-semibold text-gray-700 mb-2">
              <Shield className="w-4 h-4 inline mr-1" />
              Service Type
            </label>
            <select
              id="new-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            >
              <option value="">Choose a service...</option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {service === 'Other' && (
              <input
                type="text"
                value={customService}
                onChange={(e) => setCustomService(e.target.value)}
                placeholder="Enter service name"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="new-phone" className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              Phone Number
            </label>
            <input
              id="new-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 08012345678"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </p>
          )}

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-colors"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContactModal;