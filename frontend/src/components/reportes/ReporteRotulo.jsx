import { forwardRef } from "react";

export const ReporteRotulo = forwardRef(({ datos }, ref) => {
  if (!datos) return null;

  return (
    <div
      ref={ref}
      className="w-full max-w-4xl mx-auto bg-white border-2 border-black font-sans text-sm"
    >
      {/* Encabezado */}

      <div className="border-b-2 border-black">
        <div className="flex">
          {/* Logo y empresa */}

          <div className="w-48 border-r-2 border-black p-4 flex flex-col items-center justify-center">
            <div className="w-20 h-20 mb-2 bg-gray-100 rounded-full flex items-center justify-center">
              <img src="/logo.svg" className="text-xs text-center"></img>
            </div>

            <div className="text-xs text-center font-medium">
              EMPACADORA DE FRUTAS Y HORTALIZAS
            </div>
          </div>

          {/* Título y número */}

          <div className="flex-1">
            <div className="border-b border-black p-2 text-center font-bold">
              FORMATO
            </div>

            <div className="border-b border-black p-2 text-center font-bold">
              CONTROL DE RECEPCION MATERIA PRIMA
            </div>

            <div className="p-2 text-center">
              <span className="font-bold"></span>

              <span className="text-blue-600 font-bold text-lg">
                {datos.numeroFormato}
              </span>
            </div>
          </div>

          {/* Información del documento */}

          <div className="w-32 border-l-2 border-black">
            <div className="border-b border-black p-1 text-xs">
              <div>Código: {datos.codigo}</div>
            </div>

            <div className="border-b border-black p-1 text-xs">
              <div>Revisión: {datos.revision}</div>
            </div>

            <div className="border-b border-black p-1 text-xs">
              <div>Fecha: {new Date().toLocaleDateString("es-ES")}</div>
            </div>

            <div className="p-1 text-xs">
              <div>Página: {datos.pagina}</div>
            </div>
          </div>
        </div>

        {/* Fecha */}

        <div className="border-t-2 border-black flex">
          <div className="w-32 border-r border-black p-2 font-bold text-center">
            FECHA :
          </div>

          <div className="flex-1 p-2">{datos.fecha}</div>
        </div>
      </div>

      {/* Productor/Proveedor */}

      <div className="border-b-2 border-black flex">
        <div className="w-48 border-r border-black p-2 font-bold bg-gray-100">
          PRODUCTOR / PROVEEDOR:
        </div>

        <div className="flex-1 p-2">{datos.productorProveedor}</div>
      </div>

      {/* Tabla principal */}

      <div className="border-b-2 border-black">
        {/* Fila 1 */}

        <div className="flex border-b border-black">
          <div className="w-1/2 border-r border-black flex">
            <div className="w-32 p-2 font-bold bg-gray-100">KG INGRESADOS:</div>

            <div className="flex-1 p-2">{datos.kgIngresados}</div>
          </div>

          <div className="w-1/2 flex">
            <div className="w-32 p-2 font-bold bg-gray-100">
              BANDEJAS / JABAS:
            </div>

            <div className="flex-1 p-2">{datos.bandejas}</div>
          </div>
        </div>

        {/* Fila 2 */}

        <div className="flex border-b border-black">
          <div className="w-1/2 border-r border-black flex">
            <div className="w-32 p-2 font-bold bg-gray-100">PRODUCTO:</div>

            <div className="flex-1 p-2">{datos.producto}</div>
          </div>

          <div className="w-1/2 flex">
            <div className="w-32 p-2 font-bold bg-gray-100">N° PALLET:</div>

            <div className="flex-1 p-2">{datos.numeroPallet}</div>
          </div>
        </div>

        {/* Fila 3 */}

        <div className="flex border-b border-black">
          <div className="w-1/2 border-r border-black flex">
            <div className="w-32 p-2 font-bold bg-gray-100">VARIEDAD:</div>

            <div className="flex-1 p-2">{datos.variedad}</div>
          </div>

          <div className="w-1/2 flex">
            <div className="w-32 p-2 font-bold bg-gray-100">
              TRAZ. RECEPCION:
            </div>

            <div className="flex-1 p-2">{datos.trazRecepcion}</div>
          </div>
        </div>

        {/* Fila 4 */}

        <div className="flex border-b border-black">
          <div className="w-1/2 border-r border-black flex">
            <div className="w-16 p-2 font-bold bg-gray-100">LOTE</div>

            <div className="flex-1 p-2 border-r border-black">{datos.lote}</div>

            <div className="w-20 p-2 font-bold bg-gray-100"># INGRESO</div>

            <div className="flex-1 p-2">{datos.numeroIngreso}</div>
          </div>

          <div className="w-1/2 flex">
            <div className="w-32 p-2 font-bold bg-gray-100">
              FECHA DE PROCESO:
            </div>

            <div className="flex-1 p-2">{datos.fechaProceso}</div>
          </div>
        </div>

        {/* Fila 5 */}

        <div className="flex border-b border-black">
          <div className="w-1/2 border-r border-black flex">
            <div className="w-32 p-2 font-bold bg-gray-100">EXPORTADOR:</div>

            <div className="flex-1 p-2">{datos.exportador}</div>
          </div>

          <div className="w-1/2 flex">
            <div className="w-32 p-2 font-bold bg-gray-100">
              PESO JABA/BANDEJA:
            </div>

            <div className="flex-1 p-2">{datos.pesoJabaBandeja}</div>
          </div>
        </div>

        {/* Fila 6 */}

        <div className="flex">
          <div className="w-1/2 border-r border-black flex">
            <div className="w-32 p-2 font-bold bg-gray-100">RESPONSABLE:</div>

            <div className="flex-1 p-2">{datos.responsable}</div>
          </div>

          <div className="w-1/2 flex">
            <div className="w-32 p-2 font-bold bg-gray-100">FIRMA:</div>

            <div className="flex-1 p-2">{datos.firma}</div>
          </div>
        </div>
      </div>

      {/* Observaciones */}

      <div className="border-b-2 border-black">
        <div className="p-2 font-bold bg-gray-100">OBSERVACIONES:</div>

        <div className="p-4 min-h-16">{datos.observaciones}</div>
      </div>

      {/* Checkboxes */}

      <div className="flex items-center justify-around p-4">
        <div className="flex items-center gap-2">
          <span className="font-bold">MATERIA PRIMA</span>

          <div className="w-6 h-6 border-2 border-black flex items-center justify-center">
            {datos.materiaPrima && <span className="text-lg">✓</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold">FRUTA RECHAZADA</span>

          <div className="w-6 h-6 border-2 border-black flex items-center justify-center">
            {datos.frutaRechazada && <span className="text-lg">✓</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold">DESCARTE</span>

          <div className="w-6 h-6 border-2 border-black flex items-center justify-center">
            {datos.descarte && <span className="text-lg">✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
});
