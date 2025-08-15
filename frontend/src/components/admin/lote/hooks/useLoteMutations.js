import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  confirmarRegistroMP,
  createRegistroMP,
  deleteRegistroMP,
  updateRegistroMP,
} from "@/api/registroMPApi";

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

 

  return {
    // Mutaciones
    addRegistroMPMutation,
    updateRegistroMPMutation,
    deleteRegistroMPMutation,
    confirmarRegistroMPMutation,
  };
}
