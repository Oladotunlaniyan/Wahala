interface EmergencyServices {
    Police: string;
    "Fire Service": string | null;
    Ambulance: string | null;
}

interface Area {
    [areaName: string]: EmergencyServices;
}

// Main emergency data interface
interface EmergencyData {
    [stateName: string]: Area;
}

interface Contact {
    name: string;
    number: string;
    description: string;
    needsVerification?: boolean;
}

interface EmergencyCategory {
    category: string;
    contacts: Contact[];
}

const NATIONAL_FALLBACK = {
    fireService: "08032003557",
    ambulance: "112"
};

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



// next part

// Emergency data by state/area.
// Fire Service / Ambulance numbers that were previously hardcoded per-area followed
// obvious digit patterns (sequential/repeating pairs) and were NOT real numbers —
// e.g. +2348076543210, +2348034567890, +2348122334455, and identical numbers
// reused across multiple distinct areas (Abuja/Karu/Garki shared one number).
// All of those have been removed and set to null. Do not reintroduce numbers
// here unless they come from a verified source (state fire service / NEMA /
// state ministry of health) with a source_url and last_verified_at date.
const emergencyData: EmergencyData = {
    "Lagos": {
        "Ikeja": {
            "Police": statePoliceContacts.LAGOS,
            "Fire Service": null,
            "Ambulance": null
        },
        "Surulere": {
            "Police": statePoliceContacts.LAGOS,
            "Fire Service": null,
            "Ambulance": null
        },
        "Victoria Island": {
            "Police": statePoliceContacts.LAGOS,
            "Fire Service": null,
            "Ambulance": null
        },
        "Lekki": {
            "Police": statePoliceContacts.LAGOS,
            "Fire Service": null,
            "Ambulance": null
        }
    },
    "Federal Capital Territory": {
        "Abuja": {
            "Police": statePoliceContacts["FCT ABUJA"],
            "Fire Service": null,
            "Ambulance": null
        },
        "Karu": {
            "Police": statePoliceContacts["FCT ABUJA"],
            "Fire Service": null,
            "Ambulance": null
        },
        "Garki": {
            "Police": statePoliceContacts["FCT ABUJA"],
            "Fire Service": null,
            "Ambulance": null
        },
        "Wuse": {
            "Police": statePoliceContacts["FCT ABUJA"],
            "Fire Service": null,
            "Ambulance": null
        },
        "Maitama": {
            "Police": statePoliceContacts["FCT ABUJA"],
            "Fire Service": null,
            "Ambulance": null
        }
    },
    "Kano": {
        "Fagge": {
            "Police": statePoliceContacts.KANO,
            "Fire Service": null,
            "Ambulance": null
        },
        "Dala": {
            "Police": statePoliceContacts.KANO,
            "Fire Service": null,
            "Ambulance": null
        }
    },
    "Rivers": {
        "Port Harcourt": {
            "Police": statePoliceContacts.RIVERS,
            "Fire Service": null,
            "Ambulance": null
        },
        "Obio-Akpor": {
            "Police": statePoliceContacts.RIVERS,
            "Fire Service": null,
            "Ambulance": null
        }
    },
    "Abia": {
        "Umuahia": { "Police": statePoliceContacts.ABIA, "Fire Service": null, "Ambulance": null }
    },
    "Adamawa": {
        "Yola": { "Police": statePoliceContacts.ADAMAWA, "Fire Service": null, "Ambulance": null }
    },
    "Akwa Ibom": {
        "Uyo": { "Police": statePoliceContacts["AKWA IBOM"], "Fire Service": null, "Ambulance": null }
    },
    "Anambra": {
        "Awka": { "Police": statePoliceContacts.ANAMBRA, "Fire Service": null, "Ambulance": null }
    },
    "Bauchi": {
        "Bauchi": { "Police": statePoliceContacts.BAUCHI, "Fire Service": null, "Ambulance": null }
    },
    "Bayelsa": {
        "Yenagoa": { "Police": statePoliceContacts.BAYELSA, "Fire Service": null, "Ambulance": null }
    },
    "Benue": {
        "Makurdi": { "Police": statePoliceContacts.BENUE, "Fire Service": null, "Ambulance": null }
    },
    "Borno": {
        "Maiduguri": { "Police": statePoliceContacts.BORNO, "Fire Service": null, "Ambulance": null }
    },
    "Cross River": {
        "Calabar": { "Police": statePoliceContacts["CROSS RIVER"], "Fire Service": null, "Ambulance": null }
    },
    "Delta": {
        "Asaba": { "Police": statePoliceContacts.DELTA, "Fire Service": null, "Ambulance": null }
    },
    "Ebonyi": {
        "Abakaliki": { "Police": statePoliceContacts.EBONYI, "Fire Service": null, "Ambulance": null }
    },
    "Edo": {
        "Benin City": { "Police": statePoliceContacts.EDO, "Fire Service": null, "Ambulance": null }
    },
    "Ekiti": {
        "Ado Ekiti": { "Police": statePoliceContacts.EKITI, "Fire Service": null, "Ambulance": null }
    },
    "Enugu": {
        "Enugu": { "Police": statePoliceContacts.ENUGU, "Fire Service": null, "Ambulance": null }
    },
    "Gombe": {
        "Gombe": { "Police": statePoliceContacts.GOMBE, "Fire Service": null, "Ambulance": null }
    },
    "Imo": {
        "Owerri": { "Police": statePoliceContacts.IMO, "Fire Service": null, "Ambulance": null }
    },
    "Jigawa": {
        "Dutse": { "Police": statePoliceContacts.JIGAWA, "Fire Service": null, "Ambulance": null }
    },
    "Kaduna": {
        "Kaduna": { "Police": statePoliceContacts.KADUNA, "Fire Service": null, "Ambulance": null }
    },
    "Katsina": {
        "Katsina": { "Police": statePoliceContacts.KATSINA, "Fire Service": null, "Ambulance": null }
    },
    "Kebbi": {
        "Birnin Kebbi": { "Police": statePoliceContacts.KEBBI, "Fire Service": null, "Ambulance": null }
    },


    // last part

    "Kogi": {
        "Lokoja": { "Police": statePoliceContacts.KOGI, "Fire Service": null, "Ambulance": null }
    },
    "Kwara": {
        "Ilorin": { "Police": statePoliceContacts.KWARA, "Fire Service": null, "Ambulance": null }
    },
    "Nasarawa": {
        "Lafia": { "Police": statePoliceContacts.NASARAWA, "Fire Service": null, "Ambulance": null }
    },
    "Niger": {
        "Minna": { "Police": statePoliceContacts.NIGER, "Fire Service": null, "Ambulance": null }
    },
    "Ogun": {
        "Abeokuta": { "Police": statePoliceContacts.OGUN, "Fire Service": null, "Ambulance": null }
    },
    "Ondo": {
        "Akure": { "Police": statePoliceContacts.ONDO, "Fire Service": null, "Ambulance": null }
    },
    "Osun": {
        "Osogbo": { "Police": statePoliceContacts.OSUN, "Fire Service": null, "Ambulance": null }
    },
    "Oyo": {
        "Ibadan": { "Police": statePoliceContacts.OYO, "Fire Service": null, "Ambulance": null }
    },
    "Plateau": {
        "Jos": { "Police": statePoliceContacts.PLATEAU, "Fire Service": null, "Ambulance": null }
    },
    "Sokoto": {
        "Sokoto": { "Police": statePoliceContacts.SOKOTO, "Fire Service": null, "Ambulance": null }
    },
    "Taraba": {
        "Jalingo": { "Police": statePoliceContacts.TARABA, "Fire Service": null, "Ambulance": null }
    },
    "Yobe": {
        "Damaturu": { "Police": statePoliceContacts.YOBE, "Fire Service": null, "Ambulance": null }
    },
    "Zamfara": {
        "Gusau": { "Police": statePoliceContacts.ZAMFARA, "Fire Service": null, "Ambulance": null }
    }
};

const emergencyContacts: EmergencyCategory[] = [
    {
        category: "Emergency Services",
        contacts: [
            { name: "Police", number: "199", description: "For crimes and security emergencies" },
            { name: "Fire Service", number: NATIONAL_FALLBACK.fireService, description: "For fire emergencies and rescue operations", needsVerification: true },
            { name: "Ambulance/Medical Emergency", number: NATIONAL_FALLBACK.ambulance, description: "For medical emergencies" }
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
            { name: "Vehicle Inspection Office", number: "+234 707 773 7727", description: "For vehicle-related issues", needsVerification: true }
        ]
    },
    {
        category: "Utilities & Infrastructure",
        contacts: [
            { name: "Nigerian Communications Commission", number: "622", description: "For telecom issues and complaints" }
        ]
    },
    {
        category: "Gender-Based Violence and Mental Health Emergency Numbers",
        contacts: [
            { name: "Rape Helpline", number: "0809 596 7000, 0800 72 73 2255", description: "Provides support for rape survivors, including counseling and legal assistance." },
            { name: "Federal Government of Nigeria Toll Free Number for Violation of Girls and Women", number: "0800 72 73 2255", description: "Toll-free number for reporting violations against girls and women." },
            { name: "Child Abuse Hotline", number: "0800 800 8001", description: "Reports cases of child neglect, abuse, and exploitation." },
            {
                name: "Depression & Suicide Prevention Initiative",
                number: "080 0078 7746, +234 902 808 0416",
                description: "Mental health crisis intervention, suicide prevention counseling, and emotional support.",
                needsVerification: true
            }
        ]
    }
];

export default emergencyData;
export { statePoliceContacts, emergencyContacts, NATIONAL_FALLBACK };
export type { EmergencyData, EmergencyServices, Area, Contact, EmergencyCategory };

// the end.