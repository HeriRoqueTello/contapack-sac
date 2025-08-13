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
  
  return {
    //Mutaciones
    addProduccionMutate,
    updateProduccionMutate,
    deleteProduccionMutate,
    confirmarProduccionMutate,
  };
}
