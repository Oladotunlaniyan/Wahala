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

// Nigerian States Police Contact Numbers
const statePoliceContacts = {
  "ABIA": "08035415408, 08079210003, 08079210004, 08079210005",
  "ADAMAWA": "08089671313",
  "AKWA IBOM": "08039213071, 08020913810",
  "ANAMBRA": "07039194332, 08024922772, 08075390511, 08182951257",
  "BAUCHI": "08151849417, 08127162434, 08084763669, 08073794920",
  "BAYELSA": "07034578208",
  "BENUE": "08066006475, 08053039936, 07075390677",
  "BORNO": "08068075581, 08036071667, 08123823322",
  "CROSS RIVER": "08133568456, 07053355415",
  "DELTA": "08036684974",
  "EBONYI": "07064515001, 08125273721, 08084704673",
  "EDO": "08037646272, 08077773721, 08067551618",
  "EKITI": "08062335577, 07089310359",
  "ENUGU": "08032003702, 08075390883, 08086671202",
  "FCT ABUJA": "07057337653, 08061581938, 08032003913",
  "GOMBE": "08150567771, 08151855014",
  "IMO": "08034773600, 08037037283",
  "JIGAWA": "08075391069, 07089846285, 08123821598",
  "KADUNA": "08123822284",
  "KANO": "08032419754, 08123821575",
  "KATSINA": "08075391255, 08075391250",
  "KEBBI": "08038797644, 08075391307",
  "KOGI": "08075391335, 07038329084",
  "KWARA": "07032069501, 08125275046",
  "LAGOS": "07055462708, 08035963919",
  "NASARAWA": "08123821571, 07075391560",
  "NIGER": "08081777498, 08127185198",
  "OGUN": "08032136765, 08081770416",
  "ONDO": "07034313903, 08075391808",
  "OSUN": "08075872433, 08039537995, 08123823981",
  "OYO": "08081768614, 08150777888",
  "PLATEAU": "08126375938, 08075391844, 08038907662",
  "RIVERS": "08032003514, 08073777717",
  "SOKOTO": "07068848035, 08075391943",
  "TARABA": "08140089863, 08073260267",
  "YOBE": "07039301585, 08035067570",
  "ZAMFARA": "08106580123"
};

// Updated emergency data with comprehensive state coverage
const emergencyData: EmergencyData = {
  "Lagos": {
    "Ikeja": {
      "Police": statePoliceContacts.LAGOS,
      "Fire Service": "+2348076543210",
      "Ambulance": "+2348034567890"
    },
    "Surulere": {
      "Police": statePoliceContacts.LAGOS,
      "Fire Service": "+2348022223344",
      "Ambulance": "+2348033334455"
    },
    "Victoria Island": {
      "Police": statePoliceContacts.LAGOS,
      "Fire Service": "+2348066667777",
      "Ambulance": "+2348077778888"
    },
    "Lekki": {
      "Police": statePoliceContacts.LAGOS,
      "Fire Service": "+2348099990000",
      "Ambulance": "+2348000001111"
    }
  },
  "Federal Capital Territory": {
    "Abuja": {
      "Police": statePoliceContacts["FCT ABUJA"],
      "Fire Service": "+2349076543210",
      "Ambulance": "+2349034567890"
    },
    "Karu": {
      "Police": statePoliceContacts["FCT ABUJA"],
      "Fire Service": "+2349076543210",
      "Ambulance": "+2349034567890"
    }, 
    "Garki": {
      "Police": statePoliceContacts["FCT ABUJA"],
      "Fire Service": "+2349076543210",
      "Ambulance": "+2349034567890"
    },
    "Wuse": {
      "Police": statePoliceContacts["FCT ABUJA"],
      "Fire Service": "+2349022334455",
      "Ambulance": "+2349033445566"
    },
    "Maitama": {
      "Police": statePoliceContacts["FCT ABUJA"],
      "Fire Service": "+2349055667788",
      "Ambulance": "+2349066778899"
    }
  },
  "Kano": {
    "Fagge": {
      "Police": statePoliceContacts.KANO,
      "Fire Service": "+2348122334455",
      "Ambulance": "+2348133445566"
    },
    "Dala": {
      "Police": statePoliceContacts.KANO,
      "Fire Service": "+2348155667788",
      "Ambulance": "+2348166778899"
    }
  },
  "Rivers": {
    "Port Harcourt": {
      "Police": statePoliceContacts.RIVERS,
      "Fire Service": "+2348188990011",
      "Ambulance": "+2348199001122"
    },
    "Obio-Akpor": {
      "Police": statePoliceContacts.RIVERS,
      "Fire Service": "+2348211223344",
      "Ambulance": "+2348222334455"
    }
  },
  // Adding all other Nigerian states with police contacts
  "Abia": {
    "Umuahia": {
      "Police": statePoliceContacts.ABIA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Adamawa": {
    "Yola": {
      "Police": statePoliceContacts.ADAMAWA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Akwa Ibom": {
    "Uyo": {
      "Police": statePoliceContacts["AKWA IBOM"],
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Anambra": {
    "Awka": {
      "Police": statePoliceContacts.ANAMBRA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Bauchi": {
    "Bauchi": {
      "Police": statePoliceContacts.BAUCHI,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Bayelsa": {
    "Yenagoa": {
      "Police": statePoliceContacts.BAYELSA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Benue": {
    "Makurdi": {
      "Police": statePoliceContacts.BENUE,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Borno": {
    "Maiduguri": {
      "Police": statePoliceContacts.BORNO,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Cross River": {
    "Calabar": {
      "Police": statePoliceContacts["CROSS RIVER"],
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Delta": {
    "Asaba": {
      "Police": statePoliceContacts.DELTA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Ebonyi": {
    "Abakaliki": {
      "Police": statePoliceContacts.EBONYI,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Edo": {
    "Benin City": {
      "Police": statePoliceContacts.EDO,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Ekiti": {
    "Ado Ekiti": {
      "Police": statePoliceContacts.EKITI,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Enugu": {
    "Enugu": {
      "Police": statePoliceContacts.ENUGU,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Gombe": {
    "Gombe": {
      "Police": statePoliceContacts.GOMBE,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Imo": {
    "Owerri": {
      "Police": statePoliceContacts.IMO,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Jigawa": {
    "Dutse": {
      "Police": statePoliceContacts.JIGAWA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Kaduna": {
    "Kaduna": {
      "Police": statePoliceContacts.KADUNA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Katsina": {
    "Katsina": {
      "Police": statePoliceContacts.KATSINA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Kebbi": {
    "Birnin Kebbi": {
      "Police": statePoliceContacts.KEBBI,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Kogi": {
    "Lokoja": {
      "Police": statePoliceContacts.KOGI,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Kwara": {
    "Ilorin": {
      "Police": statePoliceContacts.KWARA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Nasarawa": {
    "Lafia": {
      "Police": statePoliceContacts.NASARAWA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Niger": {
    "Minna": {
      "Police": statePoliceContacts.NIGER,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Ogun": {
    "Abeokuta": {
      "Police": statePoliceContacts.OGUN,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Ondo": {
    "Akure": {
      "Police": statePoliceContacts.ONDO,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Osun": {
    "Osogbo": {
      "Police": statePoliceContacts.OSUN,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Oyo": {
    "Ibadan": {
      "Police": statePoliceContacts.OYO,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Plateau": {
    "Jos": {
      "Police": statePoliceContacts.PLATEAU,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Sokoto": {
    "Sokoto": {
      "Police": statePoliceContacts.SOKOTO,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Taraba": {
    "Jalingo": {
      "Police": statePoliceContacts.TARABA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Yobe": {
    "Damaturu": {
      "Police": statePoliceContacts.YOBE,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  },
  "Zamfara": {
    "Gusau": {
      "Police": statePoliceContacts.ZAMFARA,
      "Fire Service": "Contact local fire service",
      "Ambulance": "Contact local medical services"
    }
  }
};

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

export default emergencyData;
export { statePoliceContacts, emergencyContacts };
export type { EmergencyData, EmergencyServices, Area, State, Contact, EmergencyCategory };