import { ArrowLeft, Map } from 'lucide-react';
import type { LocationData } from '../types';
import { ModalShell } from './ModalShell';

interface MapModalProps {
  locationData: LocationData;
  onClose: () => void;
  onBack: () => void;
}

export function MapModal({ locationData, onClose, onBack }: MapModalProps) {
  const lat = parseFloat(locationData.latitude);
  const lon = parseFloat(locationData.longitude);
  const delta = 0.01;

  const iframeSrc =
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${lon - delta},${lat - delta},${lon + delta},${lat + delta}` +
    `&layer=mapnik&marker=${lat},${lon}`;

  return (
    <ModalShell
      title={
        <>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 mr-2 transition-colors"
          >
            <ArrowLeft size={15} /> Back
          </button>
          <span className="text-gray-200 mr-2">|</span>
          <Map className="text-blue-500" size={18} />
          Map
        </>
      }
      onClose={onClose}
    >
      <div className="space-y-3">
        {/* Address pill */}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-sm font-medium text-gray-700 truncate">{locationData.address}</p>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            {locationData.latitude}, {locationData.longitude}
          </p>
        </div>

        {/* Map — taller on desktop */}
        <div className="w-full h-64 sm:h-80 rounded-xl border border-gray-100 overflow-hidden">
          <iframe
            src={iframeSrc}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Location Map"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors font-medium"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <a
            href={`https://maps.google.com/?q=${locationData.latitude},${locationData.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors font-medium"
          >
            Google Maps
          </a>
          <a
            href={`https://www.openstreetmap.org/?mlat=${locationData.latitude}&mlon=${locationData.longitude}&zoom=16`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full transition-colors font-medium"
          >
            OpenStreetMap
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(`${locationData.latitude}, ${locationData.longitude}`)}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors font-medium"
          >
            Copy Coords
          </button>
        </div>
      </div>
    </ModalShell>
  );
}