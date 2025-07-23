export const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Education Access and Quality Improvement': 'bg-yellow-100 text-green-700',
    'Youth Empowerment and Development': 'bg-pink-100 text-pink-700',
    IT: 'bg-purple-100 text-purple-700',
    Development: 'bg-blue-100 text-blue-800',
    Art: 'bg-red-100 text-red-700',
    'Data Science': 'bg-green-100 text-yellow-800',
    Analytics: 'bg-teal-100 text-teal-800',
    'Customer Service': 'bg-indigo-100 text-indigo-700',
    Support: 'bg-orange-100 text-orange-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};
