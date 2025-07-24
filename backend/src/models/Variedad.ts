import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Producto from "./Producto";

@Table({
  tableName: "variedad",
})

class Variedad extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare nombre: string;

  @HasMany(() => Producto)
  declare productos: Producto[];
}

export default Variedad;