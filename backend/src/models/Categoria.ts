import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
//import Producto from "./Producto";

@Table({
  tableName: "categoria",
})
class Categoria extends Model {
  @AllowNull(false)
  @Column({
//<<<<<<< juan16
    type: DataType.STRING(5),
//=======
//    type: DataType.STRING(90),
//>>>>>>> main
  })
  declare nombre: string;

  //@HasMany(() => Producto) 
  //declare productos: Producto[];
}

export default Categoria;