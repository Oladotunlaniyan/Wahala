import { useState, useCallback } from 'react';
import type { SavedLocation, LocalEmergencyMatch, LocationData } from './types';

const STORAGE_KEY = 'wahala_savedLocations';

function readFromStorage(): SavedLocation[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as SavedLocation[];
  } catch {
    return [];
  }
}

function writeToStorage(locations: SavedLocation[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
}

interface UseSavedLocationsReturn {
  savedLocations: SavedLocation[];
  saveLocation: (location: LocationData, emergencyContacts: LocalEmergencyMatch | null) => void;
  deleteLocation: (id: number) => void;
}

export function useSavedLocations(): UseSavedLocationsReturn {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(readFromStorage);

  const saveLocation = useCallback(
    (location: LocationData, emergencyContacts: LocalEmergencyMatch | null) => {
      setSavedLocations((prev) => {
        const next: SavedLocation[] = [
          ...prev,
          {
            ...location,
            savedAt: new Date().toLocaleString(),
            name: `Location ${prev.length + 1}`,
            emergencyContacts,
          },
        ];
        writeToStorage(next);
        return next;
      });
    },
    [],
  );

  const deleteLocation = useCallback((id: number) => {
    setSavedLocations((prev) => {
      const next = prev.filter((loc) => loc.id !== id);
      writeToStorage(next);
      return next;
    });
  }, []);

  return { savedLocations, saveLocation, deleteLocation };
}