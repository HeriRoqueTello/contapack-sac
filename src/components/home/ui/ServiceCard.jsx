export function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100">
      <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-primary-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
