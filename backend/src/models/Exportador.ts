import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Rotulo from "./Rotulo";

@Table({
  tableName: "exportador",
})
class Exportador extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare nombreEmpresa: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(3),
  })
  declare codigo: string; 
  
  @HasMany(() => Rotulo)
  declare rotulos: Rotulo[];
}

export default Exportador;
