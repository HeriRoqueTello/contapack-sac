import { Request, Response } from "express";
import RegistroMateriaPrima from "../models/RegistroMateriaPrima";
import Exportador from "../models/Exportador";
import Productor from "../models/Productor";
import Rotulo from "../models/Rotulo";
import Responsable from "../models/Responsable";
import TransporteDescarga from "../models/TransporteDescarga";
import Chofer from "../models/chofer";
import GuiaProductor from "../models/GuiaProductor";

//listar registro -- GET
export const obtenerRegistros = async (req: Request, res: Response) => {
  try {
    const registros = await RegistroMateriaPrima.findAll({
      include: [
        {
          model: Productor,
          include: [
            {
              model: Responsable,
            },
            {
              model: GuiaProductor,
            },
          ],
        },
        { model: Exportador },
        {
          model: TransporteDescarga,
          include: [
            {
              model: Chofer,
            },
          ],
        },
      ],
    });
    res.status(200).json(registros);
  } catch (error) {
    console.log("Error al obtener registros: ", error);
    res.status(500).json({ mensaje: "No se pudieron obtener los datos" });
  }
};

//---CREAR REGISTRO (POST)
export const crearRegistro = async (req: Request, res: Response) => {
  try {
    const {
      exportador: exportadorData,
      productor: productorData,
      responsable: responsableData,
      guiaProductor: guiaProductorData,
      transporteDescarga: transporteDescargaData,
      chofer: choferData,
      ...registroMPData
    } = req.body;

    if (!productorData?.nombre) {
      res
        .status(400)
        .json({ mensaje: "El nombre del productor es obligatorio." });
      return;
    }
    if (!exportadorData?.nombreEmpresa) {
      res.status(400).json({
        mensaje: "El nombre de empresa del exportador es obligatorio.",
      });
      return;
    }
    if (!responsableData?.nombre) {
      res
        .status(400)
        .json({ mensaje: "El nombre del responsable es obligatorio." });
      return;
    }
    if (!guiaProductorData?.guiaProductor) {
      res
        .status(400)
        .json({ mensaje: "El número de guía del productor es obligatorio." });
      return;
    }
    if (!choferData?.licencia || !choferData?.nombre) {
      res.status(400).json({
        mensaje: "El nombre y la licencia del chofer son obligatorios.",
      });
      return;
    }

    //--LÓGICA PARA CODIGO INCREMENTAL EN PRODUCTOR Y EXPORTADOR
    //PRODUCTOR
    if (productorData.nombre && !productorData.codigo) {
      const ultimoProductor = await Productor.findOne({
        order: [["codigo", "DESC"]],
      });

      let nuevoCodigoNum = 1;
      //SI EXISTE UNO, TOMAR SU CODIGO, CONVERTILOA NÚMERO Y SUMARLE 1
      if (ultimoProductor && ultimoProductor.codigo) {
        nuevoCodigoNum = parseInt(ultimoProductor.codigo, 10) + 1;
      }

      //FORMATEAR EL NUEVO NUMERO A UN STRING DE 2 DÍGITOS ("01",..."10")
      productorData.codigo = String(nuevoCodigoNum).padStart(2, "0");
    }

    //EXPORTADOR
    if (exportadorData.nombreEmpresa && !exportadorData.codigo) {
      //SE BUSCA EL EXPORTADOR CON EL CODIGO MAS ALTO
      const ultimoExportador = await Exportador.findOne({
        order: [["codigo", "DESC"]],
      });

      let nuevoCodigoNum = 1;
      if (ultimoExportador && ultimoExportador.codigo) {
        nuevoCodigoNum = parseInt(ultimoExportador.codigo, 10) + 1;
      }

      exportadorData.codigo = String(nuevoCodigoNum).padStart(2, "0");
    }

    //---BUSQUEDA Y CREACIÓN DE DATOS DE OTRAS TABLAS
    //BUSQUEDA/CREACIÓN DE PRODUCTOR POR NOMBRE
    const [productor] = await Productor.findOrCreate({
      where: {
        nombre: productorData.nombre,
      },
      defaults: productorData,
    });

    //BUSQUEDA/CREACIÓN DE EXPORTADOR POR NOMBRE-EMPRESA
    const [exportador] = await Exportador.findOrCreate({
      where: {
        nombreEmpresa: exportadorData.nombreEmpresa,
      },
      defaults: exportadorData,
    });

    const codigoProductor = productor.codigo ?? "";
    const codigoExportador = exportador.codigo ?? "";
    registroMPData.codigo = `${codigoProductor}${codigoExportador}`;
    registroMPData.codNumero = `${registroMPData.codigo}-${registroMPData.numIngreso}`;

    //BUSQUEDA/CREACIÓN DE RESPONSABLE POR NOMBRE Y PRODUCTOR_ID
    const [responsable] = await Responsable.findOrCreate({
      where: {
        nombre: responsableData.nombre,
        productorId: productor.id,
      },
      defaults: responsableData,
    });

    //BUSQUEDA/CREACIÓN DE GUIA DE PRODUCTOR POR GUIA
    const [guiaProductor] = await GuiaProductor.findOrCreate({
      where: {
        guiaProductor: guiaProductorData.guiaProductor,
        productorId: productor.id,
      },
      defaults: guiaProductorData,
    });

    //CREACIÓN DEL REGISTRO PRINCIPAL-CON LOS FK QUE RECIBE
    registroMPData.productorId = productor.id;
    registroMPData.exportadorId = exportador.id;

    const nuevoRegistro = await RegistroMateriaPrima.create(registroMPData);

    //CREACIÓN DEL TRANSPORTE DE DESCARGA
    const nuevoTransporte = await TransporteDescarga.create({
      ...transporteDescargaData,
      registroMateriaPrimaId: nuevoRegistro.id,
    });

    //BUSQUEDA/CREACIÓN DE CHOFER POR LICENCIA
    const [chofer] = await Chofer.findOrCreate({
      where: { licencia: choferData.licencia },
      defaults: {
        ...choferData,
        transporteDescargaId: nuevoTransporte.id,
      },
    });

    // Si el chofer ya existía, nos aseguramos de que se asocie a ESTE nuevo transporte.
    if (chofer.transporteDescargaId !== nuevoTransporte.id) {
      chofer.transporteDescargaId = nuevoTransporte.id;
      await chofer.save();
    }

    //DEVOLVEMOS EL REGISTRO CREADO CON TODAS LAS ASOCIACIONES
    const registroFinal = await RegistroMateriaPrima.findByPk(
      nuevoRegistro.id,
      {
        include: [
          {
            model: Productor,
            include: [{ model: Responsable }, { model: GuiaProductor }],
          },
          { model: Exportador },
          { model: TransporteDescarga, include: [{ model: Chofer }] },
        ],
      }
    );
    res.status(201).json(registroFinal);
  } catch (error) {
    console.error("Error al crear registro:", error);
    res
      .status(500)
      .json({ mensaje: "Error interno del servidor.", error: error.message });
  }
};

//ACTUALIZAR REGISTRO (PUT)
export const actualizarRegistro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      productor: productorData,
      exportador: exportadorData,
      responsable: responsableData,
      guiaProductor: guiaProductorData,
      transporteDescarga: transporteDescargaData,
      chofer: choferData,
      ...registroMPData
    } = req.body;

    //VALIDACIÓN SI EL REGISTRO EXISTE
    const registro = await RegistroMateriaPrima.findByPk(id);
    if (!registro) {
      res.status(404).json({ mensaje: "Registro no encontrado" });
      return;
    }

    //--LÓGICA PARA CODIGO INCREMENTAL EN PRODUCTOR Y EXPORTADOR
    //PRODUCTOR
    if (productorData.nombre && !productorData.codigo) {
      //SE BUSCA EL PRODUCTOR CON EL CODIGO MAS ALTO
      const ultimoProductor = await Productor.findOne({
        order: [["codigo", "DESC"]],
      });

      let nuevoCodigoNum = 1;
      //SI EXISTE UNO, TOMAR SU CODIGO, CONVERTILOA NÚMERO Y SUMARLE 1
      if (ultimoProductor && ultimoProductor.codigo) {
        nuevoCodigoNum = parseInt(ultimoProductor.codigo, 10) + 1;
      }

      //FORMATEAR EL NUEVO NUMERO A UN STRING DE 2 DÍGITOS ("01",..."10")
      productorData.codigo = String(nuevoCodigoNum).padStart(2, "0");
    }

    //EXPORTADOR
    if (exportadorData.nombreEmpresa && !exportadorData.codigo) {
      //SE BUSCA EL EXPORTADOR CON EL CODIGO MAS ALTO
      const ultimoExportador = await Exportador.findOne({
        order: [["codigo", "DESC"]],
      });

      let nuevoCodigoNum = 1;
      if (ultimoExportador && ultimoExportador.codigo) {
        nuevoCodigoNum = parseInt(ultimoExportador.codigo, 10) + 1;
      }

      exportadorData.codigo = String(nuevoCodigoNum).padStart(2, "0");
    }

    //---BUSQUEDA Y CREACIÓN DE DATOS DE OTRAS TABLAS
    //BUSQUEDA/CREACIÓN DE PRODUCTOR POR NOMBRE
    const [productor] = await Productor.findOrCreate({
      where: {
        nombre: productorData.nombre,
      },
      defaults: productorData,
    });

    //BUSQUEDA/CREACIÓN DE EXPORTADOR POR NOMBRE-EMPRESA
    const [exportador] = await Exportador.findOrCreate({
      where: {
        nombreEmpresa: exportadorData.nombreEmpresa,
      },
      defaults: exportadorData,
    });

    //BUSQUEDA/CREACIÓN DE RESPONSABLE POR NOMBRE Y PRODUCTOR_ID
    const [responsable] = await Responsable.findOrCreate({
      where: {
        nombre: responsableData.nombre,
        productorId: productor.id,
      },
      defaults: responsableData,
    });
    await (productor as any).setResponsables([responsable]);

    console.log(
      "PASO 1: Datos de la guía recibidos del frontend:",
      guiaProductorData
    );

    //BUSQUEDA/CREACIÓN DE GUIA DE PRODUCTOR POR GUIA
    const [guiaProductor, fueCreado] = await GuiaProductor.findOrCreate({
      where: {
        guiaProductor: guiaProductorData.guiaProductor,
        productorId: productor.id,
      },
      defaults: guiaProductorData,
    });

    // Si la guía NO fue creada (es decir, ya existía), la actualizamos.
    if (!fueCreado) {
      guiaProductor.set(guiaProductorData); // Actualiza todos los campos (incluido pesoGuia)
      await guiaProductor.save();
    }

    await (productor as any).setGuias([guiaProductor]);

    const codigoProductor = productor.codigo ?? "";
    const codigoExportador = exportador.codigo ?? "";
    registroMPData.codigo = `${codigoProductor}${codigoExportador}`;
    registroMPData.codNumero = `${registroMPData.codigo}-${registroMPData.numIngreso}`;

    await registro.update({
      ...registroMPData,
      productorId: productor.id,
      exportadorId: exportador.id,
    });

    let transporte = await TransporteDescarga.findOne({
      where: { registroMateriaPrimaId: id },
    });

    if (transporte) {
      await transporte.update(transporteDescargaData);
    } else {
      transporte = await TransporteDescarga.create({
        ...transporteDescargaData,
        registroMateriaPrimaId: id,
      });
    }

    if (transporte && choferData?.licencia) {
      const [chofer] = await Chofer.findOrCreate({
        where: { licencia: choferData.licencia },
        defaults: choferData,
      });
      await (transporte as any).setChoferes([chofer]);
    }

    const registroActualizado = await RegistroMateriaPrima.findByPk(id, {
      include: [
        {
          model: Productor,
          include: [{ model: Responsable }, { model: GuiaProductor }],
        },
        { model: Exportador },
        { model: TransporteDescarga, include: [{ model: Chofer }] },
      ],
    });
    res.status(200).json(registroActualizado);
  } catch (error) {
    console.error("Error al actualizar registro: ", error);
    res.status(500).json({ mensaje: "Error interno al actualizar" });
  }
};

//ELIMINAR REGISTRO (DELETE)
export const eliminarRegistro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const registro = await RegistroMateriaPrima.findByPk(id);
    if (!registro) {
      res.status(404).json({ mensaje: "Registro no encontrado" });
      return;
    }

    await Rotulo.destroy({ where: { registroMateriaPrimaId: id } });

    await TransporteDescarga.destroy({ where: { registroMateriaPrimaId: id } });

    await registro.destroy();
    res.status(200).json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar registro: ", error);
    res.status(500).json({ mensaje: "Error interno al eliminar" });
  }
};

//CONFIRMAR REGISTRO
export const confirmarRegitro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const registro = await RegistroMateriaPrima.findByPk(id);
    if (!registro) {
      res.status(404).json({ mensaje: "Registro no encontrado" });
      return;
    }

    registro.estado =
      registro.estado === "Confirmado" ? "No confirmado" : "Confirmado";

    // ----------Alternativa para cambiar el estado-----------
    // if(registro.estado === "Confirmado") {
    //   registro.estado = "No confirmado";
    // } else {
    //   registro.estado = "Confirmado";
    // }

    await registro.save();
    res.status(200).json(registro);
  } catch (error) {
    console.error("Error al confirmar registro: ", error);
    res.status(500).json({ mensaje: "Error interno al confirmar" });
  }
};
