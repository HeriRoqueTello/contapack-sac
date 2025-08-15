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
  tableName: "guia_productor",
})
class GuiaProductor extends Model {
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
    type: DataType.DATEONLY,
  })
  declare fechaGuia: string;

  //---FOREINGS KEYS
  // Productor
  @ForeignKey(() => Productor)
  declare productorId: number;
  @BelongsTo(() => Productor)
  declare productor: Productor;
}
export default GuiaProductor;
