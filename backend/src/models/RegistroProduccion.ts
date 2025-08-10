import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Etiqueta from "./Etiqueta";
import Pallet from "./Pallet";
import Producto from "./Producto";

@Table({
  tableName: "registro_produccion",
})
class RegistroProduccion extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(25),
    defaultValue: "No confirmado",
  })
  declare estado: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare fecha: Date;

  @ForeignKey(() => Etiqueta)
  declare etiquetaId: number;
  @BelongsTo(() => Etiqueta)
  declare etiqueta: Etiqueta;

  @ForeignKey(() => Producto)
  declare productoId: number;
  @BelongsTo(() => Producto)
  declare Producto: Producto;

  @HasMany(() => Pallet)
  declare pallets: Pallet[];
}

export default RegistroProduccion;
