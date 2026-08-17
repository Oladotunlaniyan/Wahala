import { Phone } from 'lucide-react';
import { emergencyContacts } from '../components/data';
import { ModalShell } from './ModalShell';

interface EmergencyContactsModalProps {
  onClose: () => void;
}

export function EmergencyContactsModal({ onClose }: EmergencyContactsModalProps) {
  return (
    <ModalShell
      title={<><Phone className="text-red-500" size={18} /> Emergency Numbers</>}
      onClose={onClose}
    >
      {/* Urgent banner */}
      <div className="mb-5 bg-red-50 border border-red-100 rounded-xl p-4">
        <p className="text-sm text-red-700">
          Life-threatening emergency? Call{' '}
          <a href="tel:199" className="font-bold text-red-800 underline">199</a> or{' '}
          <a href="tel:112" className="font-bold text-red-800 underline">112</a> immediately — both toll-free.
        </p>
      </div>

      <div className="space-y-5">
        {emergencyContacts.map((category) => (
          <div key={category.category}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {category.category}
            </p>
            <div className="space-y-2">
              {category.contacts.map((contact) => (
                <div
                  key={contact.name}
                  className="bg-gray-50 rounded-xl p-4 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{contact.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{contact.description}</p>
                  </div>
                  <a
                    href={`tel:${contact.number}`}
                    className="shrink-0 flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-full transition-colors"
                  >
                    <Phone size={12} />
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}