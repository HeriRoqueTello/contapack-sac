import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Productor from "./Productor";

@Table({
  tableName: "responsable",
})
class Responsable extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(150),
  })
  declare nombre: string;

  @ForeignKey(() => Productor)
  declare productorId: number;
  @BelongsTo(() => Productor)
  declare productor: Productor;
}

export default Responsable;
