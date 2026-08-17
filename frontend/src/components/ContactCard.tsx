import { Phone } from 'lucide-react';
import { getServiceIcon, getServiceColorClass } from '../utils/emergency'

interface ContactCardProps {
  service: string;
  phone: string;
  lga: string;
}

function ContactCard({ service, phone, lga }: ContactCardProps) {
  return (
    <div
      className={`border-2 rounded-xl p-6 transition-all hover:shadow-md ${getServiceColorClass(service)}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-3xl">{getServiceIcon(service)}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{service}</h3>
            <p className="text-gray-600">
              {lga} {service}
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-1">{phone}</p>
          </div>
        </div>

        <a
          href={`tel:${phone}`}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <Phone className="w-5 h-5" />
          <span>Call Now</span>
        </a>
      </div>
    </div>
  );
}

export default ContactCard;
