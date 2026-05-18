import { useState } from 'react';
import { Clock, Loader2, MapPin, Menu, Phone, X } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useSavedLocations } from '../hooks/useSavedLocations';
import type { SavedLocation } from '../types';
import { EmergencyContactsModal } from '../modals/Emergencycontactsmodal';
import { LocationModal } from '../modals/Locationmodals';
import { MapModal } from '../modals/MapModal';

type ActiveModal = 'contacts' | 'location' | 'map' | null;

const Navbar = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const { status, locationData, localContacts, errorMessage, fetchLocation } = useGeolocation();
  const { savedLocations, saveLocation, deleteLocation } = useSavedLocations();

  const isLoading = status === 'loading';

  const handleFindLocation = async () => {
    setMenuOpen(false);
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
    setMenuOpen(false);
    setActiveModal('location');
  };

  const close = () => setActiveModal(null);

  return (
    <>
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <span className="text-xl font-extrabold text-red-600 tracking-tight">Wahala</span>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-3">
              <NavButton
                icon={<Phone size={15} />}
                onClick={() => setActiveModal('contacts')}
                variant="ghost"
              >
                Emergency Numbers
              </NavButton>
              <NavButton
                icon={isLoading ? <Loader2 size={15} className="animate-spin" /> : <MapPin size={15} />}
                onClick={handleFindLocation}
                disabled={isLoading}
                variant="primary"
              >
                {isLoading ? 'Locating…' : 'My Location'}
              </NavButton>
            </div>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
            <button
              onClick={() => { setMenuOpen(false); setActiveModal('contacts'); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Phone size={16} className="text-gray-500" />
              General Emergency Numbers
            </button>
            <button
              onClick={handleFindLocation}
              disabled={isLoading}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-sm font-semibold text-white transition-colors"
            >
              {isLoading
                ? <Loader2 size={16} className="animate-spin" />
                : <MapPin size={16} />}
              {isLoading ? 'Locating…' : 'Find My Location'}
            </button>

            {/* Saved locations in mobile menu */}
            {savedLocations.length > 0 && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 px-1">
                  Saved Locations
                </p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {savedLocations.slice(-5).map((saved) => (
                    <SavedLocationRow
                      key={saved.id}
                      saved={saved}
                      onLoad={() => handleLoadSaved(saved)}
                      onDelete={() => deleteLocation(saved.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* ── Desktop saved locations strip ── */}
      {savedLocations.length > 0 && activeModal === null && (
        <div className="hidden sm:block container mx-auto px-4 sm:px-6 max-w-3xl pt-3">
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
  children: React.ReactNode;
  variant: 'ghost' | 'primary';
  disabled?: boolean;
}

function NavButton({ icon, onClick, children, variant, disabled }: NavButtonProps) {
  const base = 'inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors';
  const styles = {
    ghost: `${base} border border-gray-200 text-gray-700 hover:bg-gray-50`,
    primary: `${base} bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white shadow-sm`,
  };
  return (
    <button onClick={onClick} disabled={disabled} className={styles[variant]}>
      {icon}
      {children}
    </button>
  );
}

function SavedLocationRow({
  saved,
  onLoad,
  onDelete,
}: {
  saved: SavedLocation;
  onLoad: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
      <button onClick={onLoad} className="flex-1 text-left min-w-0 mr-2">
        <p className="text-xs font-medium text-gray-800">{saved.name}</p>
        <p className="text-xs text-gray-400 truncate">{saved.address}</p>
      </button>
      <button
        onClick={onDelete}
        className="shrink-0 text-xs text-red-500 hover:text-red-700 font-medium"
      >
        Remove
      </button>
    </div>
  );
}

export default Navbar;