// Emergency service contact information interface
interface EmergencyServices {
  Police: string;
  "Fire Service": string;
  Ambulance: string;
}

// Area interface containing emergency services
interface Area {
  [areaName: string]: EmergencyServices;
}

// State interface containing areas
interface State {
  [stateName: string]: Area;
}

// Main emergency data interface
interface EmergencyData {
  [stateName: string]: State[keyof State];
}

// Storing hard-coded data here for a while
const emergencyData: EmergencyData = {
  "Lagos": {
    "Ikeja": {
      "Police": "+2348012345678",
      "Fire Service": "+2348076543210",
      "Ambulance": "+2348034567890"
    },
    "Surulere": {
      "Police": "+2348011112233",
      "Fire Service": "+2348022223344",
      "Ambulance": "+2348033334455"
    },
    "Victoria Island": {
      "Police": "+2348055556666",
      "Fire Service": "+2348066667777",
      "Ambulance": "+2348077778888"
    },
    "Lekki": {
      "Police": "+2348088889999",
      "Fire Service": "+2348099990000",
      "Ambulance": "+2348000001111"
    }
  },
  "Abuja": {
    "Garki": {
      "Police": "+2349012345678",
      "Fire Service": "+2349076543210",
      "Ambulance": "+2349034567890"
    },
    "Wuse": {
      "Police": "+2349011223344",
      "Fire Service": "+2349022334455",
      "Ambulance": "+2349033445566"
    },
    "Maitama": {
      "Police": "+2349044556677",
      "Fire Service": "+2349055667788",
      "Ambulance": "+2349066778899"
    }
  },
  "Kano": {
    "Fagge": {
      "Police": "+2348111223344",
      "Fire Service": "+2348122334455",
      "Ambulance": "+2348133445566"
    },
    "Dala": {
      "Police": "+2348144556677",
      "Fire Service": "+2348155667788",
      "Ambulance": "+2348166778899"
    }
  },
  "Rivers": {
    "Port Harcourt": {
      "Police": "+2348177889900",
      "Fire Service": "+2348188990011",
      "Ambulance": "+2348199001122"
    },
    "Obio-Akpor": {
      "Police": "+2348200112233",
      "Fire Service": "+2348211223344",
      "Ambulance": "+2348222334455"
    }
  }
};

export default emergencyData;
export type { EmergencyData, EmergencyServices, Area, State };