import ContactCard from './ContactCard';

interface EmergencyContactsListProps {
  contacts: Record<string, string>;
  selectedState: string;
  selectedLGA: string;
}

function EmergencyContactsList({
  contacts,
  selectedState,
  selectedLGA,
}: EmergencyContactsListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Emergency Contacts for {selectedLGA}, {selectedState}
      </h2>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        {Object.entries(contacts).map(([service, phone]) => (
          <ContactCard key={service} service={service} phone={phone} lga={selectedLGA} />
        ))}
      </div>
    </div>
  );
}

export default EmergencyContactsList;
