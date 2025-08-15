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
import Guia from "./GuiaProductor";
import Responsable from "./Responsable";
import RegistroMateriaPrima from "./RegistroMateriaPrima";

@Table({
  tableName: "productor",
})
class Productor extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare nombre: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(12),
  })
  declare clp: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(200),
  })
  declare lugReferencia: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(4),
  })
  declare codigo: string;

  //--CONTENEDOR DE ARRAYS
  //RegistroMateriaPrima
  @HasOne(() => RegistroMateriaPrima)
  declare registroMateriaPrima: RegistroMateriaPrima;
  //GuiaProductor
  @HasMany(() => Guia)
  declare guias: Guia[];
  //Responsable
  @HasMany(() => Responsable)
  declare responsables: Responsable[];
}

export default Productor;
