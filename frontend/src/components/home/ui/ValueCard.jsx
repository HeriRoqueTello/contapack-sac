export function ValueCard({ icon: Icon, title, description }) {
  return (
    <div className="text-center p-6 rounded-xl bg-primary-50 hover:bg-primary-100 transition-all duration-300 hover:shadow-primary hover:scale-105 group">
      <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-3 text-balance">
        {title}
      </h4>
      <p className="text-gray-600 text-sm leading-relaxed text-pretty">
        {description}
      </p>
    </div>
  );
}
