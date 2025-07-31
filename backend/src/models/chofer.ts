import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
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

  @HasMany(() => TransporteDescarga)
  declare transporteDescargas: TransporteDescarga[];
}

export default Chofer; 