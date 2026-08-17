import type { EmergencyData, LocalEmergencyMatch, NominatimAddress, ServiceType } from '../types';

// ─── Service UI helpers ───────────────────────────────────────────────────────

export function getServiceType(service: string): ServiceType {
  const s = service.toLowerCase();
  if (s.includes('police')) return 'police';
  if (s.includes('fire')) return 'fire';
  if (s.includes('ambulance')) return 'ambulance';
  return 'other';
}

export function getServiceIcon(service: string): string {
  const icons: Record<ServiceType, string> = {
    police: '🚔',
    fire: '🚒',
    ambulance: '🚑',
    other: '📞',
  };
  return icons[getServiceType(service)];
}

export function getServiceColorClass(service: string): string {
  const classes: Record<ServiceType, string> = {
    police: 'border-blue-200 bg-blue-50',
    fire: 'border-red-200 bg-red-50',
    ambulance: 'border-green-200 bg-green-50',
    other: 'border-gray-200 bg-gray-50',
  };
  return classes[getServiceType(service)];
}

// ─── Nigerian state name normalisation map ────────────────────────────────────

const STATE_MAPPING: Record<string, string> = {
  'federal capital territory': 'Federal Capital Territory',
  abuja: 'Federal Capital Territory',
  fct: 'Federal Capital Territory',
  lagos: 'Lagos',
  'lagos state': 'Lagos',
  kano: 'Kano',
  'kano state': 'Kano',
  rivers: 'Rivers',
  'rivers state': 'Rivers',
  abia: 'Abia',
  adamawa: 'Adamawa',
  'akwa ibom': 'Akwa Ibom',
  anambra: 'Anambra',
  bauchi: 'Bauchi',
  bayelsa: 'Bayelsa',
  benue: 'Benue',
  borno: 'Borno',
  'cross river': 'Cross River',
  delta: 'Delta',
  ebonyi: 'Ebonyi',
  edo: 'Edo',
  ekiti: 'Ekiti',
  enugu: 'Enugu',
  gombe: 'Gombe',
  imo: 'Imo',
  jigawa: 'Jigawa',
  kaduna: 'Kaduna',
  katsina: 'Katsina',
  kebbi: 'Kebbi',
  kogi: 'Kogi',
  kwara: 'Kwara',
  nasarawa: 'Nasarawa',
  niger: 'Niger',
  ogun: 'Ogun',
  ondo: 'Ondo',
  osun: 'Osun',
  oyo: 'Oyo',
  plateau: 'Plateau',
  sokoto: 'Sokoto',
  taraba: 'Taraba',
  yobe: 'Yobe',
  zamfara: 'Zamfara',
};

const FCT_AREAS = ['garki', 'wuse', 'maitama', 'karu'];

/**
 * Given a formatted address string + Nominatim raw address, returns the best
 * matching emergency contacts from the app's data, or null if no match found.
 */
export function findLocalEmergencyContacts(
  formattedAddress: string,
  rawAddress: NominatimAddress,
  emergencyData: EmergencyData,
): LocalEmergencyMatch | null {
  const addressLower = formattedAddress.toLowerCase();
  const stateLower = (rawAddress.state ?? '').toLowerCase();
  const city = rawAddress.city ?? rawAddress.town ?? rawAddress.village ?? '';
  const lga = rawAddress.county ?? rawAddress.state_district ?? '';

  // 1. Match state
  let matchedState: string | null = STATE_MAPPING[stateLower] ?? null;

  if (!matchedState) {
    for (const [key, value] of Object.entries(STATE_MAPPING)) {
      if (addressLower.includes(key)) {
        matchedState = value;
        break;
      }
    }
  }

  if (!matchedState) return null;

  const stateData = emergencyData[matchedState];
  if (!stateData) return null;

  const areas = Object.keys(stateData);

  // 2. Match LGA / area
  let matchedLGA: string | null = null;

  for (const area of areas) {
    const areaLower = area.toLowerCase();
    if (
      city.toLowerCase().includes(areaLower) ||
      lga.toLowerCase().includes(areaLower) ||
      addressLower.includes(areaLower)
    ) {
      matchedLGA = area;
      break;
    }
  }

  // Special FCT handling
  if (matchedState === 'Federal Capital Territory' && !matchedLGA) {
    for (const abujaArea of FCT_AREAS) {
      if (addressLower.includes(abujaArea)) {
        matchedLGA = abujaArea.charAt(0).toUpperCase() + abujaArea.slice(1);
        break;
      }
    }
    if (!matchedLGA && areas.includes('Abuja')) {
      matchedLGA = 'Abuja';
    }
  }

  if (matchedLGA && stateData[matchedLGA]) {
    return { state: matchedState, lga: matchedLGA, contacts: stateData[matchedLGA] };
  }

  // Fallback: first available LGA
  if (areas[0]) {
    return {
      state: matchedState,
      lga: areas[0],
      contacts: stateData[areas[0]],
      isFallback: true,
    };
  }

  return null;
}