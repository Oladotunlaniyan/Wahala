import { useState } from 'react';
import Navbar from './components/Navbar';
import PageHeader from './components/PageHeader';
import LocationSelector from './components/LocationSelector';
import EmergencyContactsList from './components/EmergencyContactsList';
import EmptyState from './components/EmptyState';
import PageFooter from './components/PageFooter';
import AddContactButton from './components/AddContactbutton';
import AddContactModal, { NewContactData } from './components/AddContactmodal';
import emergencyData from './components/data';

function App() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [data, setData] = useState(emergencyData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  const states = Object.keys(data);
  const lgas = selectedState ? Object.keys(data[selectedState]) : [];
  const contacts = selectedState && selectedLGA ? data[selectedState][selectedLGA] : null;

  // Map of state -> list of LGAs, used to power suggestions in the add-contact form
  const lgasByState = Object.fromEntries(
    Object.entries(data).map(([s, lgaMap]) => [s, Object.keys(lgaMap)])
  );

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedLGA(''); // Reset LGA when state changes
  };

  const handleAddContact = ({ state, lga, service, phone }: NewContactData) => {
    setData((prev) => {
      const next = { ...prev };
      const stateData = { ...(next[state] ?? {}) };
      const lgaData = { ...(stateData[lga] ?? {}) };
      lgaData[service] = phone;
      stateData[lga] = lgaData;
      next[state] = stateData;
      return next;
    });

    setIsModalOpen(false);
    setConfirmation(`${service} contact for ${lga}, ${state} was added.`);
    setTimeout(() => setConfirmation(''), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageHeader />

        {confirmation && (
          <div className="mb-6 text-center text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
            {confirmation}
          </div>
        )}

        <LocationSelector
          states={states}
          lgas={lgas}
          selectedState={selectedState}
          selectedLGA={selectedLGA}
          onStateChange={handleStateChange}
          onLGAChange={setSelectedLGA}
        />

        {contacts && (
          <EmergencyContactsList
            contacts={contacts}
            selectedState={selectedState}
            selectedLGA={selectedLGA}
          />
        )}

        {!selectedState && (
          <EmptyState
            title="Select Your Location"
            message="Choose your state and LGA to view emergency contacts"
          />
        )}

        {selectedState && !selectedLGA && (
          <EmptyState
            title="Select Your LGA"
            message="Choose your Local Government Area to view emergency contacts"
          />
        )}

        <PageFooter />
      </div>

      <AddContactButton onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <AddContactModal
          states={states}
          lgasByState={lgasByState}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddContact}
        />
      )}
    </div>
  );
}

export default App;