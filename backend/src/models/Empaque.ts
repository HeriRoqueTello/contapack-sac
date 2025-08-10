import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import TipoEmpaque from "./TipoEmpaque";
import Pallet from "./Pallet";

@Table({
  tableName: "empaque",
})
class Empaque extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare fecha: Date;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare peso: number;

  @ForeignKey(()=> Pallet)
  declare palletId: number;
  @BelongsTo(() => Pallet)
  declare pallet: Pallet;

  @HasMany(() => TipoEmpaque)
  declare tipoEmpaques: TipoEmpaque[];
}

export default Empaque;
