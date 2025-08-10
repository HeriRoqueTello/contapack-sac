import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
//import Producto from "./Producto";

@Table({
  tableName: "calibre",
})

class Calibre extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(2),
  })
  declare nombre: string;

  //@HasMany(() => Producto)
  //declare productos: Producto[];
}

export default Calibre;