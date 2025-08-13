import { fetchDynamicFields } from "@/api/dynamicFieldsApi";
import { getEtiquetas } from "@/api/etiquetaApi";
import { useQuery } from "@tanstack/react-query";

export function useEtiquetaData() {
  //Cargar campos dinámicos al moantar el componente
  const {
    data: dynamicFields,
    isLoading: isLoadingDynamic,
    isError: isErrorDynamic,
    error: errorDynamic,
  } = useQuery({
    queryKey: ["dynamicFields"],
    queryFn: fetchDynamicFields,
  });

  //Query para obtener datos de etiqueta
  const {
    isLoading: isLoadingEtiqueta,
    data: dataEtiqueta,
    isError: isErrorEtiqueta,
    error: errorEtiqueta,
  } = useQuery({
    queryKey: ["etiquetas"],
    queryFn: getEtiquetas,
  });

  return {
    //Datos
    dataEtiqueta,
    dynamicFields,

    //Estados de carga
    isLoadingEtiqueta,
    isLoadingDynamic,
    isLoading: isLoadingEtiqueta || isLoadingDynamic,

    //Estados de error
    isErrorEtiqueta,
    isErrorDynamic,
    errorEtiqueta,
    errorDynamic,
  };
}
