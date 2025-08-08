import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/embarque/fieldsEmbarque";
import { DataTable } from "@/components/admin/DataTable";
import { columnsEmbarque } from "@/components/admin/embarque/columnsEmbarque";
import { useTableData } from "@/hooks/useTableData";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/user-store";
import { useNavigate } from "react-router";

export function EmbarqueView() {
  const {
    data: dataEmbarque,
    addRegistro,
    confirmRegistro,
    deleteRegistro,
    actualizarRegistro,
  } = useTableData("dataEmbarque", []);

  const { profile } = useAuthStore();
  const userArea = profile.Area.descripcion;
  const areasAllow = ["Sistemas", "Produccion", "Recepcion"];
  const navigate = useNavigate();

  const [registroEditando, setRegistroEditando] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Estado para ver pallets
  const [palletsModal, setPalletsModal] = useState({
    open: false,
    data: [],
    title: "",
  });

  // Función para abrir modal
  const handleVerPallets = (data, title) => {
    setPalletsModal({ open: true, data, title });
  };

  // Agregar la función `onVerPallets` a cada registro
  const dataConFuncion = dataEmbarque.map((item) => ({
    ...item,
    onVerPallets: handleVerPallets,
  }));
  if (areasAllow.includes(userArea)) {
    return (
      <div className="text-end">
        <DialogDemo
          fields={fields}
          title="Registro de Embarque"
          onSubmit={registroEditando ? actualizarRegistro : addRegistro}
          initialData={registroEditando}
          onClose={() => {
            setRegistroEditando(null);
            setDialogOpen(false);
          }}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />

        <DataTable
          columns={columnsEmbarque(
            confirmRegistro,
            deleteRegistro,
            setRegistroEditando,
            setDialogOpen,
            handleVerPallets
          )}
          data={dataConFuncion}
          filterColumnKey="id"
          placeholder="Buscar por ID"
        />

        {/* Modal para ver pallets */}
        {palletsModal.open && (
          <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-2/3 max-h-[80vh] overflow-auto">
              <h2 className="text-xl font-bold mb-4 text-center ">
                {palletsModal.title}
              </h2>
              {palletsModal.data.length > 0 ? (
                <div className="overflow-hidden rounded-lg border border-gray-300">
                  <table className="min-w-full border-collapse">
                    <thead className="bg-green-800 text-white text-center">
                      <tr>
                        <th className="px-4 py-2 border-b border-gray-300">
                          #
                        </th>
                        <th className="px-4 py-2 border-b border-gray-300">
                          N° Pallet
                        </th>
                        <th className="px-4 py-2 border-b border-gray-300">
                          CAT
                        </th>
                        <th className="px-4 py-2 border-b border-gray-300">
                          Temperatura
                        </th>
                        <th className="px-4 py-2 border-b border-gray-300">
                          Cantidad
                        </th>
                        <th className="px-4 py-2 border-b border-gray-300">
                          Observaciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {palletsModal.data.map((pallet, index) => (
                        <tr key={index} className="text-center">
                          <td className="px-4 py-2 border-b border-gray-300">
                            {index + 1}
                          </td>
                          <td className="px-4 py-2 border-b border-gray-300">
                            {pallet.numero}
                          </td>
                          <td className="px-4 py-2 border-b border-gray-300">
                            {pallet.cat}
                          </td>
                          <td className="px-4 py-2 border-b border-gray-300">
                            {pallet.temperatura}
                          </td>
                          <td className="px-4 py-2 border-b border-gray-300">
                            {pallet.cantidad}
                          </td>
                          <td className="px-4 py-2 border-b border-gray-300">
                            {pallet.obs}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No hay datos disponibles.</p>
              )}
              <div className="text-right mt-4">
                <Button
                  onClick={() =>
                    setPalletsModal({ ...palletsModal, open: false })
                  }
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return navigate(`/admin`);
}
