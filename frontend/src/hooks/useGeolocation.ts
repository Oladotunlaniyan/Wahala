import { useState, useCallback } from 'react';
import type { LocationData, LocalEmergencyMatch, NominatimAddress } from '../types';
import { findLocalEmergencyContacts } from '../utils/emergency';
import emergencyData from '../components/data';

interface NominatimResponse {
  display_name: string;
  address: NominatimAddress;
}

export type GeolocationStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseGeolocationReturn {
  status: GeolocationStatus;
  locationData: LocationData | null;
  localContacts: LocalEmergencyMatch | null;
  errorMessage: string;
  fetchLocation: () => Promise<void>;
}

export function useGeolocation(): UseGeolocationReturn {
  const [status, setStatus] = useState<GeolocationStatus>('idle');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [localContacts, setLocalContacts] = useState<LocalEmergencyMatch | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchLocation = useCallback(async () => {
    setStatus('loading');
    setErrorMessage('');
    setLocalContacts(null);

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser.');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10_000,
          maximumAge: 60_000,
        });
      });

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      );

      if (!response.ok) throw new Error('Failed to retrieve address information.');

      const data: NominatimResponse = await response.json();
      const address = data.address ?? {};

      const formattedAddress = [
        address.house_number,
        address.road,
        address.neighbourhood ?? address.suburb,
        address.city ?? address.town ?? address.village,
        address.state,
        address.country,
      ]
        .filter(Boolean)
        .join(', ');

      const newLocationData: LocationData = {
        id: Date.now(),
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
        address: formattedAddress || data.display_name,
        rawAddress: address,
        timestamp: new Date().toLocaleString(),
      };

      setLocationData(newLocationData);
      setLocalContacts(
        findLocalEmergencyContacts(newLocationData.address, address, emergencyData),
      );
      setStatus('success');
    } catch (err) {
      const message =
        err instanceof GeolocationPositionError && err.code === err.PERMISSION_DENIED
          ? 'Location access denied. Please enable location permissions and try again.'
          : err instanceof Error
            ? err.message
            : 'Unable to get your location. Please try again.';

      setErrorMessage(message);
      setStatus('error');
    }
  }, []);

  return { status, locationData, localContacts, errorMessage, fetchLocation };
}