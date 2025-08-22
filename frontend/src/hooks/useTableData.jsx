import { useState, useEffect } from "react";

export function useTableData(key, initialData = []) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  const addRegistro = (newData) => {
    console.log({ newData });
    setData((prev) => {
      const maxId =
        prev.length > 0 ? Math.max(...prev.map((item) => Number(item.id))) : 0;
      const newId = (maxId + 1).toString();
      const newRecord = { id: newId, estado: "No Confirmado", ...newData };
      return [...prev, newRecord];
    });
  };

  const confirmRegistro = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              estado:
                item.estado === "Confirmado" ? "No Confirmado" : "Confirmado",
            }
          : item
      )
    );
  };
  const actualizarRegistro = (actualizado) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === actualizado.id ? { ...item, ...actualizado } : item
      )
    );
  };

  const deleteRegistro = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  console.log({ data });
  return {
    data,
    addRegistro,
    confirmRegistro,
    deleteRegistro,
    actualizarRegistro,
  };
}
