import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  confirmarRegistroMP,
  createRegistroMP,
  deleteRegistroMP,
  updateRegistroMP,
} from "@/api/registroMPApi";
import {
  getISOWeekNumber,
  construirCodigoLote,
  calcularDiferenciaPeso,
} from "../utils/loteUtils";

/**
 * Hook personalizado para manejar las mutaciones de lotes
 */
export function useLoteMutations() {
  const queryCliente = useQueryClient();

  // Mutación para eliminar lote
  const deleteRegistroMPMutation = useMutation({
    mutationFn: deleteRegistroMP,
    onSuccess: () => {
      queryCliente.invalidateQueries(["lotes"]);
    },
  });

  // Mutación para actualizar lote
  const updateRegistroMPMutation = useMutation({
    mutationFn: ({ id, datos }) => updateRegistroMP(id, datos),
    onSuccess: () => {
      queryCliente.invalidateQueries(["lotes"]);
      queryCliente.invalidateQueries(["dynamicFields"]);
    },
  });

  // Mutación para crear lote
  const addRegistroMPMutation = useMutation({
    mutationFn: createRegistroMP,
    onSuccess: () => {
      queryCliente.invalidateQueries(["lotes"]);
      queryCliente.invalidateQueries(["dynamicFields"]);
    },
  });

  // Mutación para confirmar lote
  const confirmarRegistroMPMutation = useMutation({
    mutationFn: confirmarRegistroMP,
    onSuccess: () => {
      queryCliente.invalidateQueries(["lotes"]);
    },
  });

  /**
   * Maneja la creación de un nuevo lote
   */

  const handleAdd = (nuevoRegistro, dynamicFields) => {
    // Buscar productor y exportador seleccionados por ID
    const productor = dynamicFields.productores?.find(
      (p) => p.id === Number(nuevoRegistro.productorId)
    );
    const exportador = dynamicFields.exportadores?.find(
      (e) => e.id === Number(nuevoRegistro.exportadorId)
    );

    // Validar que ambos existan
    if (!productor || !exportador) {
      alert("Debes seleccionar un productor y un exportador válidos.");
      return;
    }

    // Construir códigos únicos para el registro
    const { codigo, codNumero } = construirCodigoLote(
      productor,
      exportador,
      nuevoRegistro.numIngreso
    );

    nuevoRegistro.codigo = codigo;
    nuevoRegistro.codNumero = codNumero;

    // Usar los datos del formulario si están disponibles, sino usar los del productor
    nuevoRegistro.clp = nuevoRegistro.clp || productor.clp || "";
    nuevoRegistro.lugReferencia =
      nuevoRegistro.lugReferencia ||
      productor.lugReferencia ||
      "Sin Referencia lote";

    // Calcular semana ISO y campaña según la fecha de ingreso
    nuevoRegistro.numSemana = getISOWeekNumber(nuevoRegistro.fecha);
    nuevoRegistro.campaña = new Date(nuevoRegistro.fecha).getFullYear();

    // Usar la guía del formulario si está disponible, sino buscar en las guías existentes
    nuevoRegistro.guiaProductorId =
      Number(nuevoRegistro.guiaProductorId) || null;

    const guia = dynamicFields.guiaProductor?.find(
      (g) => g.id === nuevoRegistro.guiaProductor
    );
    nuevoRegistro.pesoGuia = guia?.pesoGuia || 0.0;

    // Usar el responsable del formulario si está disponible, sino buscar en los responsables existentes
    if (!nuevoRegistro.responsable) {
      const responsable = dynamicFields.responsables?.find(
        (r) => r.id === Number(nuevoRegistro.responsableId)
      );
      nuevoRegistro.responsable = responsable?.nombre || "Sin Responsable lote";
    }

    // Buscar transporte seleccionado por ID
    const transporte = dynamicFields.transporteDescarga?.find(
      (t) => t.id === Number(nuevoRegistro.transporteDescargaId)
    );

    // Guardar solo la referencia al transporte, no sus atributos duplicados
    nuevoRegistro.transporteDescargaId = transporte?.id;

    // Inicializar valores numéricos por defecto
    nuevoRegistro.pesoNeto = 0.0;
    nuevoRegistro.cantJabas = 0;

    // Calcular diferencia de peso entre guía y peso neto
    const difPesoCalculado = calcularDiferenciaPeso(
      nuevoRegistro.pesoGuia,
      nuevoRegistro.pesoNeto
    );

    nuevoRegistro.difPeso = isNaN(difPesoCalculado) ? 0.0 : difPesoCalculado;

    console.log(nuevoRegistro);

    // Enviar el registro completo al backend para su persistencia
    addRegistroMPMutation.mutate(nuevoRegistro);
  };

  /**
   * Maneja la actualización de un lote existente
   */
  const handleUpdate = async (registroActualizado, dynamicFields) => {
    // Buscar productor y exportador seleccionados por ID
    const productor = dynamicFields.productores?.find(
      (p) => p.id === Number(registroActualizado.productorId)
    );
    const exportador = dynamicFields.exportadores?.find(
      (e) => e.id === Number(registroActualizado.exportadorId)
    );

    // Validar que ambos existan
    if (!productor || !exportador) {
      alert("Debes seleccionar un productor y un exportador válidos.");
      return;
    }

    // Construir códigos únicos para el registro solo si no existen
    if (!registroActualizado.codigo) {
      const { codigo, codNumero } = construirCodigoLote(
        productor,
        exportador,
        registroActualizado.numIngreso
      );
      registroActualizado.codigo = codigo;
      registroActualizado.codNumero = codNumero;
    }

    // Usar los datos del formulario si están disponibles, sino usar los del productor
    registroActualizado.clp = registroActualizado.clp || productor.clp || "";
    registroActualizado.lugReferencia =
      registroActualizado.lugReferencia ||
      productor.lugReferencia ||
      "Sin Referencia lote";

    // Calcular semana ISO y campaña según la fecha de ingreso
    registroActualizado.numSemana = getISOWeekNumber(registroActualizado.fecha);
    registroActualizado.campaña = new Date(
      registroActualizado.fecha
    ).getFullYear();

    // Usar la guía del formulario si está disponible, sino buscar en las guías existentes
    if (!registroActualizado.guiaProductor) {
      const guia = dynamicFields.guiaProductor?.find(
        (g) => g.productorId === Number(registroActualizado.productorId)
      );
      registroActualizado.guiaProductor = guia?.guiaProductor || "Sin Guía";
      registroActualizado.pesoGuia =
        registroActualizado.pesoGuia || guia?.pesoGuia || 0.0;
    }

    // Calcular diferencia de peso entre guía y peso neto
    registroActualizado.difPeso = calcularDiferenciaPeso(
      registroActualizado.pesoGuia,
      registroActualizado.pesoNeto
    );

    // Usar el responsable del formulario si está disponible, sino buscar en los responsables existentes
    if (!registroActualizado.responsable) {
      const responsable = dynamicFields.responsables?.find(
        (r) => r.id === Number(registroActualizado.responsableId)
      );
      registroActualizado.responsable =
        responsable?.nombre || "Sin Responsable lote";
    }

    // Buscar transporte seleccionado por ID
    const transporte = dynamicFields.transporteDescarga?.find(
      (t) => t.id === Number(registroActualizado.transporteDescargaId)
    );

    // Guardar solo la referencia al transporte, no sus atributos duplicados
    registroActualizado.transporteDescargaId = transporte?.id;

    // Eliminar campos no persistentes o temporales
    const registroFinal = { ...registroActualizado };
    delete registroFinal.rotulos;
    delete registroFinal.codigo;

    // Enviar actualización al backend
    updateRegistroMPMutation.mutate({
      id: registroActualizado.id,
      datos: registroFinal,
    });
  };

  /**
   * Maneja la eliminación de un lote
   */
  const handleEliminar = async (id) => {
    deleteRegistroMPMutation.mutate(id);
  };

  /**
   * Maneja la confirmación de un lote
   */
  const handleConfirmar = async (id) => {
    confirmarRegistroMPMutation.mutate(id);
  };

  return {
    // Mutaciones
    addRegistroMPMutation,
    updateRegistroMPMutation,
    deleteRegistroMPMutation,
    confirmarRegistroMPMutation,

    // Handlers
    handleAdd,
    handleUpdate,
    handleEliminar,
    handleConfirmar,
  };
}
