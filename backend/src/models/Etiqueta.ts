import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import Productor from "./Productor";
import Producto from "./Producto";
import Exportador from "./Exportador";

@Table({
  tableName: "etiqueta",
})
class Etiqueta extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  declare trazabilidad: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare estado: string;

  // Productor
  @ForeignKey(() => Productor)
  @Column
  declare productorId: number;

  @BelongsTo(() => Productor)
  declare Productor: Productor;

  // Producto
  @ForeignKey(() => Producto)
  @Column
  declare productoId: number;

  @BelongsTo(() => Producto)
  declare Producto: Producto;

  // Exportador
  @ForeignKey(() => Exportador)
  @Column
  declare exportadorId: number;

  @BelongsTo(() => Exportador)
  declare Exportador: Exportador;
}

export default Etiqueta;





