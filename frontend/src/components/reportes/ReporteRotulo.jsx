import { forwardRef } from "react";

export const ReporteRotulo = forwardRef(({ datos }, ref) => {
  if (!datos) return null;
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        maxWidth: "64rem" /* 1024px */,
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderWidth: "2px",
        borderColor: "#000000",
        borderStyle: "solid",
        fontFamily: "sans-serif",
        fontSize: "0.875rem" /* 14px */,
      }}
    >
      {/* Encabezado */}
      <div style={{ borderBottom: "2px solid #000000" }}>
        <div style={{ display: "flex" }}>
          {/* Logo y empresa */}
          <div
            style={{
              width: "12rem",
              borderWidth: "2px",
              borderRightStyle: "solid",
              borderColor: "#000000",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "5rem",
                height: "5rem",
                marginBottom: "0.5rem",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F3F4F6",
              }}
            >
              <img
                src="/logo.svg"
                style={{
                  fontSize: "0.75rem",
                  textAlign: "center",
                  height: "90px",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              EMPACADORA DE FRUTAS Y HORTALIZAS
            </div>
          </div>
          <div style={{ flex: "1 1 0%" }}>
            <div
              style={{
                borderBottom: "1px solid #000000",
                padding: "0.5rem",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              FORMATO
            </div>
            <div
              style={{
                borderBottom: "1px solid #000000",
                padding: "0.5rem",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              CONTROL DE RECEPCION MATERIA PRIMA
            </div>
            <div style={{ padding: "0.5rem", textAlign: "center" }}>
              <span style={{ fontWeight: "700" }}>N° </span>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "1.125rem",
                  color: "#2563EB",
                }}
              >
                {datos.numeroFormato}
              </span>
            </div>
          </div>
          {/* Información del documento */}
          <div
            style={{
              width: "8rem",
              borderLeftWidth: "2px",
              borderLeftStyle: "solid",
              borderColor: "#000000",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #000000",
                padding: "0.25rem",
                fontSize: "0.75rem",
              }}
            >
              <div>Código: {datos.codigo}</div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #000000",
                padding: "0.25rem",
                fontSize: "0.75rem",
              }}
            >
              <div>Revisión: {datos.revision}</div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #000000",
                padding: "0.25rem",
                fontSize: "0.75rem",
              }}
            >
              <div>Fecha: {new Date().toLocaleDateString("es-ES")}</div>
            </div>
            <div style={{ padding: "0.25rem", fontSize: "0.75rem" }}>
              <div>Página: {datos.pagina}</div>
            </div>
          </div>
        </div>
        {/* Fecha */}
        <div style={{ borderTop: "2px solid #000000", display: "flex" }}>
          <div
            style={{
              width: "8rem",
              borderRight: "1px solid #000000",
              padding: "0.5rem",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            FECHA :
          </div>
          <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>{datos.fecha}</div>
        </div>
      </div>
      {/* Productor/Proveedor */}
      <div style={{ borderBottom: "2px solid #000000", display: "flex" }}>
        <div
          style={{
            width: "12rem",
            borderRight: "1px solid #000000",
            padding: "0.5rem",
            fontWeight: "700",
            backgroundColor: "#F3F4F6",
          }}
        >
          PRODUCTOR / PROVEEDOR:
        </div>
        <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
          {datos.productorProveedor}
        </div>
      </div>
      {/* Tabla principal */}
      <div style={{ borderBottom: "2px solid #000000" }}>
        {/* Fila 1 */}
        <div style={{ display: "flex", borderBottom: "1px solid #000000" }}>
          <div
            style={{
              width: "50%",
              borderRight: "1px solid #000000",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              KG INGRESADOS:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.kgIngresados}
            </div>
          </div>
          <div style={{ width: "50%", display: "flex" }}>
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              BANDEJAS / JABAS:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.bandejas}
            </div>
          </div>
        </div>
        {/* Fila 2 */}
        <div style={{ display: "flex", borderBottom: "1px solid #000000" }}>
          <div
            style={{
              width: "50%",
              borderRight: "1px solid #000000",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              PRODUCTO:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.producto}
            </div>
          </div>
          <div style={{ width: "50%", display: "flex" }}>
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              N° PALLET:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.numeroPallet}
            </div>
          </div>
        </div>
        {/* Fila 3 */}
        <div style={{ display: "flex", borderBottom: "1px solid #000000" }}>
          <div
            style={{
              width: "50%",
              borderRight: "1px solid #000000",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              VARIEDAD:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.variedad}
            </div>
          </div>
          <div style={{ width: "50%", display: "flex" }}>
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              TRAZ. RECEPCION:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.trazRecepcion}
            </div>
          </div>
        </div>
        {/* Fila 4 */}
        <div style={{ display: "flex", borderBottom: "1px solid #000000" }}>
          <div
            style={{
              width: "50%",
              borderRight: "1px solid #000000",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "4rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              LOTE
            </div>
            <div
              style={{
                flex: "1 1 0%",
                padding: "0.5rem",
                borderRight: "1px solid #000000",
              }}
            >
              {datos.lote}
            </div>
            <div
              style={{
                width: "5rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              # INGRESO
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.numeroIngreso}
            </div>
          </div>
          <div style={{ width: "50%", display: "flex" }}>
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              FECHA DE PROCESO:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.fechaProceso}
            </div>
          </div>
        </div>
        {/* Fila 5 */}
        <div style={{ display: "flex", borderBottom: "1px solid #000000" }}>
          <div
            style={{
              width: "50%",
              borderRight: "1px solid #000000",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              EXPORTADOR:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.exportador}
            </div>
          </div>
          <div style={{ width: "50%", display: "flex" }}>
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              PESO JABA/BANDEJA:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.pesoJabaBandeja}
            </div>
          </div>
        </div>
        {/* Fila 6 */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "50%",
              borderRight: "1px solid #000000",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              RESPONSABLE:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.responsable}
            </div>
          </div>
          <div style={{ width: "50%", display: "flex" }}>
            <div
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontWeight: "700",
                backgroundColor: "#F3F4F6",
              }}
            >
              FIRMA:
            </div>
            <div style={{ flex: "1 1 0%", padding: "0.5rem" }}>
              {datos.firma}
            </div>
          </div>
        </div>
      </div>
      {/* Observaciones */}
      <div style={{ borderBottom: "2px solid #000000" }}>
        <div
          style={{
            padding: "0.5rem",
            fontWeight: "700",
            backgroundColor: "#F3F4F6",
          }}
        >
          OBSERVACIONES:
        </div>
        <div style={{ padding: "1rem", minHeight: "4rem" }}>
          {datos.observaciones}
        </div>
      </div>
      {/* Checkboxes */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontWeight: "700" }}>MATERIA PRIMA</span>
          <div
            style={{
              width: "1.5rem",
              height: "1.5rem",
              borderWidth: "2px",
              borderColor: "#000000",
              borderStyle: "solid",
              backgroundColor: datos.materiaPrima ? "#000000" : "transparent",
            }}
          ></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontWeight: "700" }}>FRUTA RECHAZADA</span>
          <div
            style={{
              width: "1.5rem",
              height: "1.5rem",
              borderWidth: "2px",
              borderColor: "#000000",
              borderStyle: "solid",
              backgroundColor: datos.frutaRechazada ? "#000000" : "transparent",
            }}
          ></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontWeight: "700" }}>DESCARTE</span>
          <div
            style={{
              width: "1.5rem",
              height: "1.5rem",
              borderWidth: "2px",
              borderColor: "#000000",
              borderStyle: "solid",
              backgroundColor: datos.descarte ? "#000000" : "transparent",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
});
