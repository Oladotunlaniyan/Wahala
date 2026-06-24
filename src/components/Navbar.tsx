import { useState } from 'react';
import { Clock, Loader2, MapPin, Phone } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useSavedLocations } from '../hooks/useSavedLocations';
import type { SavedLocation } from '../types';
import { EmergencyContactsModal } from '../modals/Emergencycontactsmodal';
import { LocationModal } from '../modals/Locationmodals';
import { MapModal } from '../modals/MapModal';

type ActiveModal = 'contacts' | 'location' | 'map' | null;

const Navbar = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const { status, locationData, localContacts, errorMessage, fetchLocation } = useGeolocation();
  const { savedLocations, saveLocation, deleteLocation } = useSavedLocations();

  const isLoading = status === 'loading';

  const handleFindLocation = async () => {
    await fetchLocation();
    setActiveModal('location');
  };

  const handleSave = () => {
    if (!locationData) return;
    saveLocation(locationData, localContacts);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  const handleLoadSaved = (_saved: SavedLocation) => {
    setActiveModal('location');
  };

  const close = () => setActiveModal(null);

  return (
    <>
      {/* ── Top bar ── */}
      {/* No hamburger / collapsible menu — both actions are always visible, */}
      {/* so the header's height never changes and can never overlap content */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="flex items-center justify-between h-14 gap-2">

            {/* Logo */}
            <span className="text-lg sm:text-xl font-extrabold text-red-600 tracking-tight shrink-0">
              Wahala
            </span>

            {/* Nav actions — visible on all screen sizes, with short labels */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <NavButton
                icon={<Phone size={15} />}
                onClick={() => setActiveModal('contacts')}
                variant="ghost"
                label="Numbers"
                fullLabel="Emergency Numbers"
              />
              <NavButton
                icon={isLoading ? <Loader2 size={15} className="animate-spin" /> : <MapPin size={15} />}
                onClick={handleFindLocation}
                disabled={isLoading}
                variant="primary"
                label={isLoading ? 'Locating…' : 'My location'}
                fullLabel={isLoading ? 'Locating…' : 'My Location'}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Saved locations strip ── */}
      {savedLocations.length > 0 && activeModal === null && (
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl pt-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold uppercase tracking-widest mb-2">
              <Clock size={13} />
              Saved Locations ({savedLocations.length})
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {savedLocations.slice(-5).map((saved) => (
                <button
                  key={saved.id}
                  onClick={() => handleLoadSaved(saved)}
                  className="shrink-0 text-left bg-white border border-blue-100 rounded-lg px-3 py-2 hover:border-blue-300 transition-colors group"
                >
                  <p className="text-xs font-semibold text-blue-800 group-hover:text-blue-900">{saved.name}</p>
                  <p className="text-xs text-blue-500 max-w-[160px] truncate">{saved.address}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {activeModal === 'contacts' && <EmergencyContactsModal onClose={close} />}

      {activeModal === 'location' && (
        <LocationModal
          locationData={locationData}
          localContacts={localContacts}
          errorMessage={errorMessage}
          saveFeedback={saveFeedback}
          onClose={close}
          onRetry={handleFindLocation}
          onSave={handleSave}
          onViewMap={() => setActiveModal('map')}
        />
      )}

      {activeModal === 'map' && locationData && (
        <MapModal
          locationData={locationData}
          onClose={close}
          onBack={() => setActiveModal('location')}
        />
      )}
    </>
  );
};

// ─── Small reusable pieces ───────────────────────────────────────────────────

interface NavButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  /** Short label shown on small screens (keeps both buttons on one row) */
  label: string;
  /** Fuller label shown from the sm breakpoint up, where there's more room */
  fullLabel: string;
  variant: 'ghost' | 'primary';
  disabled?: boolean;
}

function NavButton({ icon, onClick, label, fullLabel, variant, disabled }: NavButtonProps) {
  const base =
    'inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium px-2.5 sm:px-4 py-2 rounded-full transition-colors whitespace-nowrap';
  const styles = {
    ghost: `${base} border border-gray-200 text-gray-700 hover:bg-gray-50`,
    primary: `${base} bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white shadow-sm`,
  };
  return (
    <button onClick={onClick} disabled={disabled} className={styles[variant]}>
      {icon}
      {/* Short label on mobile, fuller label once there's more horizontal room */}
      <span className="sm:hidden">{label}</span>
      <span className="hidden sm:inline">{fullLabel}</span>
    </button>
  );
}

export default Navbar;