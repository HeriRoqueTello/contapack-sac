import { Request, Response } from "express";
import Empaque from "../models/Empaque";
import Etiqueta from "../models/Etiqueta";
import Pallet from "../models/Pallet";
import RegistroProduccion from "../models/RegistroProduccion";
import TipoEmpaque from "../models/TipoEmpaque";
import Producto from "../models/Producto";
import Variedad from "../models/Variedad";
import Categoria from "../models/Categoria";
import Calibre from "../models/Calibre";

//listar producción -- GET
export const obtenerProduccion = async (req: Request, res: Response) => {
  try {
    const produccion = await RegistroProduccion.findAll({
      include: [
        { model: Etiqueta },
        {
          model: Pallet,
          include: [
            {
              model: Empaque,
              include: [
                {
                  model: TipoEmpaque,
                },
              ],
            },
          ],
        },
        {
          model: Producto,
          include: [
            {
              model: Categoria,
            },
            {
              model: Calibre,
            },
            {
              model: Variedad,
            },
          ],
        },
      ],
    });
    res.status(200).json(produccion);
  } catch (error) {
    {
      console.log("Error al obtener producción: ", error);
      res.status(500).json({ mensaje: "No se pudieron obtener los datos" });
    }
  }
};

//crear produccion -- POST
export const crearProduccion = async (req: Request, res: Response) => {
  try {
    const {
      pallet: palletData,
      empaque: empaqueData,
      producto,
      ...produccionData
    } = req.body;

    //----POST-PRODUCCIÓN
    const [categoria] = await Categoria.findOrCreate({
      where: { nombre: producto.categoria },
      defaults: { nombre: producto.categoria },
    });
    const [calibre] = await Calibre.findOrCreate({
      where: { nombre: producto.calibre },
      defaults: { nombre: producto.calibre },
    });
    const [variedad] = await Variedad.findOrCreate({
      where: { nombre: producto.variedad },
      defaults: { nombre: producto.variedad },
    });

    const [productoCreado] = await Producto.findOrCreate({
      where: {
        nombre: producto.nombre,
        variedadId: variedad.id,
        calibreId: calibre.id,
        categoriaId: categoria.id,
      },
      defaults: {
        nombre: producto.nombre,
        variedadId: variedad.id,
        calibreId: calibre.id,
        categoriaId: categoria.id,
      },
    });

    produccionData.productoId = productoCreado.id;

    //----POST-PRODUCCION(PRINCIPAL)
    const nuevaProduccion = await RegistroProduccion.create(produccionData);

    //----POST-PALLETS, EMPAQUE, TIPO_EMPAQUE
    let nuevoPallet = null;
    let nuevoEmpaque = null;
    let nuevoTipoEmpaque = null;

    if (palletData) {
      // 1. Convertimos los datos a números para evitar errores de tipo.
      const palletNumero = parseInt(palletData.numero || "0", 10);
      const palletCantidad = parseInt(palletData.cantidad || "0", 10);
      const palletPeso = parseFloat(palletData.peso || "0.0");

      nuevoPallet = await Pallet.create({
        numeropallet: palletNumero,
        cantidad: palletCantidad,
        peso: palletPeso,
        posicion: "A-1",
        hora: new Date(),
        registroProduccionId: nuevaProduccion.id,
      });

      // 2. Crear el único Empaque, si viene
      if (empaqueData && nuevoPallet) {
        // 1. Separamos el 'tipo' del resto de los datos del empaque
        const { tipo, ...datosDelEmpaque } = empaqueData;

        // 2. Creamos el Empaque con el resto de los datos
        nuevoEmpaque = await Empaque.create({
          ...datosDelEmpaque,
          palletId: nuevoPallet.id,
        });

        // 3. Si se proporcionó un 'tipo', creamos el TipoEmpaque asociado
        if (tipo && nuevoEmpaque) {
          nuevoTipoEmpaque = await TipoEmpaque.create({
            tipo: tipo,
            empaqueId: nuevoEmpaque.id,
          });
        }
      }
    }

    //Respuesta final con todo
    res.status(201).json({
      produccion: nuevaProduccion,
      producto: productoCreado,
      pallet: nuevoPallet,
      empaque: nuevoEmpaque,
      tipoEmpaque: nuevoTipoEmpaque,
    });
  } catch (error) {
    console.error("Error al crear producción: ", error);
    res.status(500).json({ mensaje: "Error al crear producción" });
  }
};

//Actualizar producción -- PUT
export const actualizarProduccion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      producto: productoData,
      pallet: palletData,
      empaque: empaqueData,
      ...produccionData
    } = req.body;

    const produccion = await RegistroProduccion.findByPk(id);
    if (!produccion) {
      res
        .status(404)
        .json({ mensaje: "Registro de producción no encontrado" });
      return;
    }

    if (productoData && productoData.nombre) {
      const [categoria] = await Categoria.findOrCreate({
        where: { nombre: productoData.categoria },
      });
      const [calibre] = await Calibre.findOrCreate({
        where: { nombre: productoData.calibre },
      });
      const [variedad] = await Variedad.findOrCreate({
        where: { nombre: productoData.variedad },
      });
      const [productoActualizado] = await Producto.findOrCreate({
        where: {
          nombre: productoData.nombre,
          variedadId: variedad.id,
          calibreId: calibre.id,
          categoriaId: categoria.id,
        },
      });
      produccionData.productoId = productoActualizado.id;
    }

    await produccion.update(produccionData);

    if (palletData) {
      const [pallet] = await Pallet.findOrCreate({
        where: { registroProduccionId: produccion.id },
        defaults: {
          numeropallet: palletData.numero,
          cantidad: palletData.cantidad,
          peso: palletData.peso,
          registroProduccionId: produccion.id,
        },
      });

      await pallet.update({
        numeropallet: palletData.numero,
        cantidad: palletData.cantidad,
        peso: palletData.peso,
      });

      if (empaqueData && pallet) {
        const { tipo, ...datosDelEmpaque } = empaqueData;

        const [empaque] = await Empaque.findOrCreate({
          where: { palletId: pallet.id },
          defaults: { ...datosDelEmpaque, palletId: pallet.id },
        });

        await empaque.update(datosDelEmpaque);

        if (tipo && empaque) {
          const [tipoEmpaque] = await TipoEmpaque.findOrCreate({
            where: { empaqueId: empaque.id },
            defaults: { tipo: tipo, empaqueId: empaque.id },
          });

          await tipoEmpaque.update({ tipo: tipo });
        }
      }
    }

    const produccionFinal = await RegistroProduccion.findByPk(id, {
      include: [
        { model: Etiqueta },
        {
          model: Pallet,
          include: [
            {
              model: Empaque,
              include: [
                {
                  model: TipoEmpaque,
                },
              ],
            },
          ],
        },
        {
          model: Producto,
          include: [
            {
              model: Categoria,
            },
            {
              model: Calibre,
            },
            {
              model: Variedad,
            },
          ],
        },
      ],
    });

    res.status(200).json(produccionFinal);
  } catch (error) {
    console.error("Error al actualizar producción: ", error);
    res.status(500).json({ mensaje: "Error interno al actualizar" });
  }
};

//Eliminar producción -- DELETE
export const eliminarProduccion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await RegistroProduccion.destroy({ where: { id } });
    res.status(200).json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producción: ", error);
    res.status(500).json({ mensaje: "Error interno al eliminar" });
  }
};

//Confirmar Registro
export const confirmarProduccion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const produccion = await RegistroProduccion.findByPk(id);

    if (!produccion) {
      res.status(404).json({ mensaje: "Registro de producción no encontrado" });
      return;
    }

    produccion.estado =
      produccion.estado === "Confirmado" ? "No confirmado" : "Confirmado";

    await produccion.save();
    res.status(200).json(produccion);
  } catch (error) {
    console.log("Error al confirmar reigstro de produccion: ", error);
    res.status(500).json({ mensaje: "Erro interno al confirmar" });
  }
};
