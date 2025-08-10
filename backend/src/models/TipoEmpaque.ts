import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Empaque from "./Empaque";

@Table({
  tableName: "tipo_empaque",
})
class TipoEmpaque extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare tipo: string;

  @ForeignKey(() => Empaque)
  declare empaqueId: number;
  @BelongsTo(() => Empaque)
  declare Empaque: Empaque;
}

export default TipoEmpaque;
