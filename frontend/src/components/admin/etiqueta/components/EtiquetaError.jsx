/**
 * Componente de error para etiqueta
 */
export function EtiquetaError({ error, message }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Error al cargar datos
        </h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {error && (
          <details className="text-sm text-gray-500">
            <summary className="cursor-pointer hover:text-gray-700">
              Ver detalles del error
            </summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
              {error.message || JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
