import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import RegistroMateriaPrima from "./RegistroMateriaPrima";

import Exportador from "./Exportador";
import Producto from "./Producto";
import Productor from "./Productor";

@Table({
  tableName: "rotulo",
})
class Rotulo extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
    defaultValue: "No confirmado",
  })
  declare estado: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare fecha: Date;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare kgIngresados: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare numIngreso: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(150),
  })
  declare responsable: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare bandJabas: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare numPallet: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(13),
  })
  declare trazRecepcion: string;

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
  })
  declare fechaProceso: Date;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare pesoJabaBandeja: number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(100),
  })
  declare firma: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(250),
  })
  declare obs: string;

  //Opciones para marcar
  @AllowNull(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare materiaPrima: boolean;

  @AllowNull(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare frutaRechazada: boolean;

  @AllowNull(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare descarte: boolean;

  //FOREIGNS KEY:
  // RegistroMateriaPrima
  @ForeignKey(() => RegistroMateriaPrima)
  declare registroMateriaPrimaId: number;

  @BelongsTo(() => RegistroMateriaPrima)
  declare RegistroMateriaPrima: RegistroMateriaPrima;


  // Producto
  @ForeignKey(() => Producto)
  declare productoId: number;
  
  @BelongsTo(() => Producto)
  declare Producto: Producto;


  // Exportador
  @ForeignKey(() => Exportador)
  declare exportadorId: number;

  @BelongsTo(() => Exportador)
  declare Exportador: Exportador;


  // Productor
  @ForeignKey(() => Productor)
  declare productorId: number;

  @BelongsTo(() => Productor)
  declare Productor: Productor;


  // Lote
}
export default Rotulo;
