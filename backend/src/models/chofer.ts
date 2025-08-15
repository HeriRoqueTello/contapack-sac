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
import TransporteDescarga from "./TransporteDescarga";

@Table({
  tableName: "chofer",
})
class Chofer extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(20),
  })
  declare licencia: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(150),
  })
  declare nombre: string;

  //---FOREINGS KEYS
  //TransporteDescarga
  @ForeignKey(() => TransporteDescarga)
  declare transporteDescargaId: number;
  @BelongsTo(() => TransporteDescarga)
  declare TransporteDescarga: TransporteDescarga;
}

export default Chofer;
