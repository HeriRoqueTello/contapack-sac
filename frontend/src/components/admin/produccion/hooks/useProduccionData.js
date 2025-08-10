import { fetchDynamicFields } from "@/api/dynamicFieldsApi";
import { getProduccion } from "@/api/produccionApi";
import { useQuery } from "@tanstack/react-query";

export function useProduccionData() {
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

  //Query para obtener datos de producción
  const {
    isLoading: isLoadingProduccion,
    data: dataProduccion,
    isError: isErrorProduccion,
    error: errorProduccion,
  } = useQuery({
    queryKey: ["produccion"],
    queryFn: getProduccion,
  });

  return {
    //Datos
    dataProduccion,
    dynamicFields,

    //Estados de carga
    isLoadingProduccion,
    isLoadingDynamic,
    isLoading: isLoadingProduccion || isLoadingDynamic,

    //Estados de error
    isErrorProduccion,
    isErrorDynamic,
    errorProduccion,
    errorDynamic,
  };
}
