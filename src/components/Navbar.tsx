import { useState } from 'react';
import { X, Phone, MapPin } from 'lucide-react';


 const emergencyContacts = [
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
        { name: "Emergency Response Africa", number: " 0-8000-2255-372", description: "This is toll-free and connects you to the ESA" }
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
      contacts:[
        {name: "Rape Helpline", number: "080072732255 (toll-free)", description: "Provides support for rape survivors, including counseling and legal assistance."},
        {name: "Women’s Rights and Health Project (WRAHP)", number: "0807 658 7873", description: "Promotes women’s rights, health, and well-being through advocacy, legal support, and community-based health programs."},
        {name: "Child Abuse Hotline", number: "08085753932, 08102678442", description: "Reports cases of child neglect, abuse, and exploitation."},
        {name: "Depression & Suicide Prevention Initiative", number: "0023419125106", description: "Mental health crisis intervention, suicide prevention counseling, and emotional support."}
      ]
    }
  ];

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <nav className="w-full flex items-center justify-between px-8 py-4">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-red-600">
          Wahala
        </div>
        
        {/* Center: Nav links */}
        {/* <ul className="flex gap-8 text-lg">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Our Services</a></li>
        </ul> */}
        
        {/* Right: Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={openModal}
            className="border px-4 py-2 rounded hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
          >
            <Phone size={18} />
            General Emergency Contacts
          </button>
          
          <button className="px-4 py-2 rounded text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2">
            <MapPin size={18} />
            Find your location
          </button>
          
          {/* <button className="text-lg">🌓</button> */}
        </div>
      </nav>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Phone className="text-red-600" size={24} />
                General Emergency Contacts
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">

              {/* Important Notice */}
              <div className="mt-6 mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Important Notice:</h4>
                <p className="text-red-700 text-sm">
                  In case of life-threatening emergencies, call <strong className='text-lg'>199 or 112</strong> immediately. 
                  Keep these numbers saved in your phone for quick access during emergencies, they are toll-free.
                </p>
              </div>

              <div className="grid gap-6">
                {emergencyContacts.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                      {category.category}
                    </h3>
                    <div className="grid gap-3">
                      {category.contacts.map((contact, contactIndex) => (
                        <div key={contactIndex} className="bg-white rounded-lg p-4 shadow-sm border">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                            <div className="flex items-center gap-2">
                              <Phone size={16} className="text-red-600" />
                              <a 
                                href={`tel:${contact.number}`}
                                className="text-red-600 font-bold text-lg hover:text-red-700 transition-colors duration-200"
                              >
                                {contact.number}
                              </a>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{contact.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
              <button 
                onClick={closeModal}
                className="px-6 py-2  bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;