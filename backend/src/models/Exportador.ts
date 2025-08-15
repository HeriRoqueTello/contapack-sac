import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import Rotulo from "./Rotulo";
import RegistroMateriaPrima from "./RegistroMateriaPrima";

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
  
  //---CONTENEDOR DE ARRAYS
  @HasOne(() => RegistroMateriaPrima)
  declare registroMateriaPrima: RegistroMateriaPrima;
}

export default Exportador;
