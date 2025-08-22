/**
 * Componente de carga para lotes
 */
export function RotuloLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando datos de rotulo...</p>
      </div>
    </div>
  );
}
