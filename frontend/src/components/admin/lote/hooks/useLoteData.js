import { useQuery } from "@tanstack/react-query";
import { getRegistroMP } from "@/api/registroMPApi";
import { getRotulos } from "@/api/rotuloApi";
import { fetchDynamicFields } from "@/api/dynamicFieldsApi";

/**
 * Hook personalizado para manejar los datos de lotes
 */
export function useLoteData() {
  // Cargar campos dinámicos al montar el componente
  const {
    data: dynamicFields,
    isLoading: isLoadingDynamic,
    isError: isErrorDynamic,
    error: errorDynamic,
  } = useQuery({
    queryKey: ["dynamicFields"],
    queryFn: fetchDynamicFields,
  });

  // Query para obtener lotes
  const {
    isLoading: isLoadingLote,
    data: dataLote,
    isError: isErrorLote,
    error: errorLote,
  } = useQuery({
    queryKey: ["lotes"],
    queryFn: getRegistroMP,
  });

  // Query para obtener rótulos
  const {
    isLoading: isLoadingRotulo,
    data: dataRotulo,
    isError: isErrorRotulo,
    error: errorRotulo,
  } = useQuery({
    queryKey: ["rotulos"],
    queryFn: getRotulos,
  });

  return {
    // Datos
    dataLote,
    dataRotulo,
    dynamicFields,

    // Estados de carga
    isLoadingLote,
    isLoadingRotulo,
    isLoadingDynamic,
    isLoading: isLoadingLote || isLoadingRotulo || isLoadingDynamic,

    // Estados de error
    isErrorLote,
    isErrorRotulo,
    isErrorDynamic,
    errorLote,
    errorRotulo,
    errorDynamic,
  };
}
