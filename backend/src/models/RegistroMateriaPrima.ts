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
  tableName: "registro_materia_prima",
})
class RegistroMateriaPrima extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(25),
    defaultValue: "No confirmado",
  })
  declare estado: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare horaDescarga: Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(8),
  })
  declare codNumero: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare campaña: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare numSemana: number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(20),
  })
  declare ordenVolcado: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(25),
  })
  declare glosa: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare pesoNeto: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare cantJabas: number;

  @AllowNull(true)
  @Column({
    type: DataType.FLOAT,
  })
  declare pesoDescuento: number;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare difPeso: number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(250),
  })
  declare obs: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(150),
  })
  declare descargado: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(250),
  })
  declare detServicio: string;

  @HasMany(() => Rotulo)
  declare rotulos: Rotulo[];
}
export default RegistroMateriaPrima;
