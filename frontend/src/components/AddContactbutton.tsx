import { PlusCircle } from 'lucide-react';

interface AddContactButtonProps {
  onClick: () => void;
}

function AddContactButton({ onClick }: AddContactButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 z-40"
    >
      <PlusCircle className="w-5 h-5" />
      <span>Add Contact</span>
    </button>
  );
}

export default AddContactButton;