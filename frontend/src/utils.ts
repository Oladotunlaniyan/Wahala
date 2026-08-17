export const getServiceIcon = (service: string) => {
  if (service.toLowerCase().includes('police')) {
    return '🚔';
  } else if (service.toLowerCase().includes('fire')) {
    return '🚒';
  } else if (service.toLowerCase().includes('ambulance')) {
    return '🚑';
  }
  return '📞';
};

export const getServiceColor = (service: string) => {
  if (service.toLowerCase().includes('police')) {
    return 'border-blue-200 bg-blue-50';
  } else if (service.toLowerCase().includes('fire')) {
    return 'border-red-200 bg-red-50';
  } else if (service.toLowerCase().includes('ambulance')) {
    return 'border-green-200 bg-green-50';
  }
  return 'border-gray-200 bg-gray-50';
};
