import { AlertTriangle } from 'lucide-react';

function PageHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-red-100 p-3 rounded-full mr-3">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Nigeria Emergency Contacts
        </h1>
      </div>
      <p className="text-gray-600 text-lg">
        Quick access to emergency services across Nigerian states
      </p>
    </div>
  );
}

export default PageHeader;
