/**
 * Hook personalizado para manejar las mutaciones de producción
 */

import {
  confirmarProduccion,
  createProduccion,
  deleteProduccion,
  updateProduccion,
} from "@/api/produccionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProduccionMutations() {
  const queryCliente = useQueryClient();

  // Mutación para eliminar producción
  const deleteProduccionMutate = useMutation({
    mutationFn: deleteProduccion,
    onSuccess: () => {
      queryCliente.invalidateQueries(["produccion"]);
    },
  });

  //Mutación para actualizar producción
  const updateProduccionMutate = useMutation({
    mutationFn: ({ id, datos }) => updateProduccion(id, datos),
    onSuccess: () => {
      queryCliente.invalidateQueries(["produccion"]);
      queryCliente.invalidateQueries(["dynamicFields"]);
    },
  });

  //Mutación para crear producción
  const addProduccionMutate = useMutation({
    mutationFn: createProduccion,
    onSuccess: () => {
      queryCliente.invalidateQueries(["produccion"]);
    },
  });

  //Mutation para confirmar producción
  const confirmarProduccionMutate = useMutation({
    mutationFn: confirmarProduccion,
    onSuccess: () => {
      queryCliente.invalidateQueries(["produccion"]);
    },
  });

  /**
   * Maneja la creación de un nuevo registro de producción
   */

  const handleAdd = (nuevaProduccion, dynamicFields) => {
    const payload = {
      ...nuevaProduccion,
      ...dynamicFields,
    };

    payload.fecha = new Date().toISOString().split("T")[0];
    payload.estado = "No confirmado";

    addProduccionMutate.mutate(payload);
  };

  /**
   * Maneja la actualización de un registro de producción existente
   */

  const handleUpdate = (id, produccionActualizado, dynamicFields) => {
    //Asginar la fecha actual en formato YYYY-MM-DD
    produccionActualizado.fecha = new Date().toISOString().split("T")[0];
    updateProduccionMutate.mutate({
      id: id,
      datos: {
        ...produccionActualizado,
        ...dynamicFields,
      },
    });
  };

  /**
   * Maneja la eliminación de un registro de producción
   */

  const handleEliminar = (id) => {
    deleteProduccionMutate.mutate(id);
  };

  /**
   * Maneja la confirmación de un registro de producción
   */

  const handleConfirmar = (id) => {
    confirmarProduccionMutate.mutate(id);
  };

  return {
    //Mutaciones
    addProduccionMutate,
    updateProduccionMutate,
    deleteProduccionMutate,

    //Handlers
    handleAdd,
    handleUpdate,
    handleEliminar,
    handleConfirmar,
  };
}
