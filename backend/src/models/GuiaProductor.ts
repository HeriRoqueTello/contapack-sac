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
  tableName: "guia",
})
class Guia extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(20),
  })
  declare guiaProductor: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare pesoGuia: number;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare fechaGuia: string;

  @ForeignKey(() => Productor)
  declare productorId: number;
  @BelongsTo(() => Productor)
  declare productor: Productor;
}
export default Guia;
