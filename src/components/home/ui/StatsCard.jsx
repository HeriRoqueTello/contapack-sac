export function StatsCard({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
        {number}
      </div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
}
