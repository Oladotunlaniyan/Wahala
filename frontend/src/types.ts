// ─── Emergency Data Types ─────────────────────────────────────────────────────

export interface EmergencyServices {
  Police: string;
  'Fire Service': string;
  Ambulance: string;
}

export type LGAMap = Record<string, EmergencyServices>;
export type EmergencyData = Record<string, LGAMap>;

// ─── General Contact Types ────────────────────────────────────────────────────

export interface Contact {
  name: string;
  number: string;
  description: string;
}

export interface EmergencyCategory {
  category: string;
  contacts: Contact[];
}

// ─── Geolocation Types ───────────────────────────────────────────────────────

/** Raw address fields returned by Nominatim reverse-geocoding */
export interface NominatimAddress {
  house_number?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city?: string;
  town?: string;
  village?: string;
  state?: string;
  county?: string;
  state_district?: string;
  country?: string;
}

export interface LocationData {
  id: number;
  latitude: string;
  longitude: string;
  address: string;
  rawAddress: NominatimAddress;
  timestamp: string;
}

export interface LocalEmergencyMatch {
  state: string;
  lga: string;
  contacts: EmergencyServices;
  /** True when we fell back to the first LGA instead of an exact match */
  isFallback?: boolean;
}

// ─── Saved Location ───────────────────────────────────────────────────────────

export interface SavedLocation extends LocationData {
  savedAt: string;
  name: string;
  emergencyContacts: LocalEmergencyMatch | null;
}

// ─── Service UI Helpers ──────────────────────────────────────────────────────

export type ServiceType = 'police' | 'fire' | 'ambulance' | 'other';