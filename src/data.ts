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

interface Contact {
  name: string;
  number: string;
  description: string;
}

interface EmergencyCategory {
  category: string;
  contacts: Contact[];
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
  "Federal Capital territory": {
    "Karu": {
      "Police": "+2349012345678",
      "Fire Service": "+2349076543210",
      "Ambulance": "+2349034567890"
    }, 
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

const emergencyContacts: EmergencyCategory[] = [
  {
    category: "Emergency Services",
    contacts: [
      { name: "Police", number: "199", description: "For crimes and security emergencies" },
      { name: "Fire Service", number: "01-7944929", description: "For fire emergencies and rescue operations" },
      { name: "Ambulance/Medical Emergency", number: "767", description: "For medical emergencies" }
    ]
  },
  {
    category: "Health Services",
    contacts: [
      { name: "Nigeria Red Cross Society", number: "0803-123-0430, 0809-993-7357", description: "Offers first aid, disaster response, and humanitarian medical services." },
      { name: "Emergency Response Africa", number: "0-8000-2255-372", description: "This is toll-free and connects you to the ESA" }
    ]
  },
  {
    category: "Traffic & Road Emergency",
    contacts: [
      { name: "Federal Road Safety Corps", number: "122", description: "For road traffic emergencies" },
      { name: "Vehicle Inspection Office", number: "199", description: "For vehicle-related issues" }
    ]
  },
  {
    category: "Utilities & Infrastructure",
    contacts: [
      { name: "Power Holding Company", number: "0700-2255-6328", description: "For power outages and electrical issues" },
      { name: "Nigerian Communications Commission", number: "622", description: "For telecom issues and complaints" }
    ]
  },
  {
    category: "Gender-Based Violence and Mental Health Emergency Numbers",
    contacts: [
      { name: "Rape Helpline", number: "080072732255 (toll-free)", description: "Provides support for rape survivors, including counseling and legal assistance." },
      { name: "Women's Rights and Health Project (WRAHP)", number: "0807 658 7873", description: "Promotes women's rights, health, and well-being through advocacy, legal support, and community-based health programs." },
      { name: "Child Abuse Hotline", number: "08085753932, 08102678442", description: "Reports cases of child neglect, abuse, and exploitation." },
      { name: "Depression & Suicide Prevention Initiative", number: "0023419125106", description: "Mental health crisis intervention, suicide prevention counseling, and emotional support." }
    ]
  }
];

export { emergencyContacts, type Contact, type EmergencyCategory };