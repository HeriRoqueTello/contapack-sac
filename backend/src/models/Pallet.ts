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
import RegistroProduccion from "./RegistroProduccion";
import Empaque from "./Empaque";
import Etiqueta from "./Etiqueta";

@Table({
  tableName: "pallet",
})
class Pallet extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare numeropallet: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare cantidad: number;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare peso: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare posicion: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare hora: string;

  @ForeignKey(() => RegistroProduccion)
  declare registroProduccionId: number;
  @BelongsTo(() => RegistroProduccion)
  declare RegistroProduccion: RegistroProduccion;

  @ForeignKey(() => Etiqueta)
  declare etiquetaId: number;
  @BelongsTo(() => Etiqueta)
  declare Etiqueta: Etiqueta;

  @HasMany(() => Empaque)
  declare empaque: Empaque[];
}

export default Pallet;
