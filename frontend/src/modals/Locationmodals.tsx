import { AlertTriangle, Clock, Map, MapPin, Phone, Save } from 'lucide-react';
import type { LocalEmergencyMatch, LocationData } from '../types';
import { getServiceColorClass, getServiceIcon } from '../utils/emergency';
import { ModalShell } from './ModalShell';

interface LocationModalProps {
  locationData: LocationData | null;
  localContacts: LocalEmergencyMatch | null;
  errorMessage: string;
  saveFeedback?: boolean;
  onClose: () => void;
  onRetry: () => void;
  onSave: () => void;
  onViewMap: () => void;
}

export function LocationModal({
  locationData,
  localContacts,
  errorMessage,
  saveFeedback = false,
  onClose,
  onRetry,
  onSave,
  onViewMap,
}: LocationModalProps) {
  const hasError = Boolean(errorMessage);

  return (
    <ModalShell
      title={
        <>
          <MapPin className={hasError ? 'text-red-500' : 'text-green-500'} size={18} />
          {hasError ? 'Location Error' : 'Your Location'}
        </>
      }
      onClose={onClose}
    >
      {hasError ? (
        <ErrorState message={errorMessage} onRetry={onRetry} onClose={onClose} />
      ) : locationData ? (
        <LocationDetails
          locationData={locationData}
          localContacts={localContacts}
          saveFeedback={saveFeedback}
          onSave={onSave}
          onViewMap={onViewMap}
        />
      ) : null}
    </ModalShell>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ErrorState({
  message,
  onRetry,
  onClose,
}: {
  message: string;
  onRetry: () => void;
  onClose: () => void;
}) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
        <MapPin size={26} className="text-red-500" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-2">Unable to Get Location</h3>
      <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">{message}</p>
      <button
        onClick={() => { onClose(); onRetry(); }}
        className="bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

function LocationDetails({
  locationData,
  localContacts,
  saveFeedback,
  onSave,
  onViewMap,
}: {
  locationData: LocationData;
  localContacts: LocalEmergencyMatch | null;
  saveFeedback: boolean;
  onSave: () => void;
  onViewMap: () => void;
}) {
  return (
    <div className="space-y-4">
      {/* Address */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1">Address</p>
        <p className="text-green-800 text-sm font-medium">{locationData.address}</p>
      </div>

      {/* Local emergency contacts */}
      {localContacts ? (
        <LocalContactsSection localContacts={localContacts} />
      ) : (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="flex gap-2">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
            <p className="text-amber-800 text-sm">
              No local contacts found automatically. Use <strong>General Emergency Numbers</strong> or
              select your location manually on the main screen.
            </p>
          </div>
        </div>
      )}

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-3">
        <CoordBox label="Latitude" value={locationData.latitude} />
        <CoordBox label="Longitude" value={locationData.longitude} />
      </div>

      {/* Timestamp */}
      <div className="flex items-center gap-2 text-gray-400 text-xs">
        <Clock size={13} />
        Retrieved {locationData.timestamp}
      </div>

      {/* Actions — 2×2 grid on mobile, row on larger */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <ActionButton onClick={() => navigator.clipboard.writeText(locationData.address)} color="gray">
          Copy Address
        </ActionButton>
        <ActionButton
          onClick={() => navigator.clipboard.writeText(`${locationData.latitude}, ${locationData.longitude}`)}
          color="gray"
        >
          Copy Coords
        </ActionButton>
        <ActionButton onClick={onViewMap} color="blue" icon={<Map size={14} />}>
          View Map
        </ActionButton>
        <ActionButton
          onClick={onSave}
          color={saveFeedback ? 'green' : 'orange'}
          icon={<Save size={14} />}
        >
          {saveFeedback ? 'Saved ✓' : 'Save'}
        </ActionButton>
      </div>

      {/* External links */}
      <div className="flex gap-2 pt-1 border-t border-gray-100">
        <ExternalLink
          href={`https://maps.google.com/?q=${locationData.latitude},${locationData.longitude}`}
          color="red"
        >
          Google Maps
        </ExternalLink>
        <ExternalLink
          href={`https://www.openstreetmap.org/?mlat=${locationData.latitude}&mlon=${locationData.longitude}&zoom=16`}
          color="green"
        >
          OpenStreetMap
        </ExternalLink>
      </div>
    </div>
  );
}

function LocalContactsSection({ localContacts }: { localContacts: LocalEmergencyMatch }) {
  return (
    <div className="bg-red-50 border border-red-100 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className="text-red-500 shrink-0" size={15} />
        <p className="text-xs font-semibold uppercase tracking-widest text-red-600">
          Local Contacts
          {localContacts.isFallback && (
            <span className="normal-case font-normal text-red-400 ml-1">(nearest)</span>
          )}
        </p>
      </div>
      <p className="text-xs text-red-500 mb-3">{localContacts.lga}, {localContacts.state}</p>

      <div className="space-y-2">
        {Object.entries(localContacts.contacts).map(([service, phone]) => (
          <div
            key={service}
            className={`border rounded-xl p-3 flex items-center justify-between gap-3 ${getServiceColorClass(service)}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl shrink-0">{getServiceIcon(service)}</span>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm">{service}</p>
                <p className="text-gray-500 text-xs truncate">{phone}</p>
              </div>
            </div>
            <a
              href={`tel:${phone}`}
              className="shrink-0 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Phone size={11} />
              Call
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoordBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="font-mono text-gray-700 text-sm">{value}</p>
    </div>
  );
}

type BtnColor = 'gray' | 'blue' | 'orange' | 'green' | 'red';

const colorMap: Record<BtnColor, string> = {
  gray: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  orange: 'bg-orange-500 hover:bg-orange-600 text-white',
  green: 'bg-emerald-500 hover:bg-emerald-600 text-white',
  red: 'bg-red-600 hover:bg-red-700 text-white',
};

function ActionButton({
  onClick,
  color,
  icon,
  children,
}: {
  onClick: () => void;
  color: BtnColor;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`${colorMap[color]} py-2.5 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-colors`}
    >
      {icon}
      {children}
    </button>
  );
}

function ExternalLink({ href, color, children }: { href: string; color: BtnColor; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-1 ${colorMap[color]} text-center py-2 px-3 rounded-xl text-xs font-medium transition-colors`}
    >
      {children}
    </a>
  );
}