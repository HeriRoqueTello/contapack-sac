import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Rotulo from "./Rotulo";
import Guia from "./GuiaProductor";
import Responsable from "./Responsable";

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

  @HasMany(() => Rotulo)
  declare rotulos: Rotulo[];
  @HasMany(() => Guia)
  declare guias: Guia[];
  @HasMany(() => Responsable)
  declare responsables: Responsable[];
}

export default Productor;
