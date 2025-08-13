import {
  confirmarEtiqueta,
  createEtiqueta,
  deleteEtiqueta,
  updateEtiqueta,
} from "@/api/etiquetaApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEtiquetaMutations() {
  const queryCliente = useQueryClient();

  const addEtiquetaMutate = useMutation({
    mutationFn: createEtiqueta,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["etiquetas"] });
    },
  });

  const updateEtiquetaMutate = useMutation({
    mutationFn: ({ id, datos }) => updateEtiqueta(id, datos),
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["etiquetas"] });
    },
  });

  const deleteEtiquetaMutate = useMutation({
    mutationFn: deleteEtiqueta,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["etiquetas"] });
    },
  });

  const confirmarEtiquetaMutate = useMutation({
    mutationFn: confirmarEtiqueta,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["etiquetas"] });
    },
  });

  return {
    addEtiquetaMutate,
    updateEtiquetaMutate,
    deleteEtiquetaMutate,
    confirmarEtiquetaMutate,
  };
}
