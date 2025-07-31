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
import Rotulo from "./Rotulo";
import Productor from "./Productor";
import Exportador from "./Exportador";
import TransporteDescarga from "./TransporteDescarga";

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
    type: DataType.DATE,
  })
  declare fecha: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(25),
  })
  declare glosa: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(10),
  })
  declare codigo: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare numIngreso: number;

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

  //FOREIGNS KEYS
  // Productor
  @ForeignKey(() => Productor)
  declare productorId: number;
  @BelongsTo(() => Productor)
  declare Productor: Productor;

  //Exportador
  @ForeignKey(() => Exportador)
  declare exportadorId: number;
  @BelongsTo(() => Exportador)
  declare Exportador: Exportador;

  @HasMany(() => Rotulo)
  declare rotulos: Rotulo[];

  @HasMany(() => TransporteDescarga)
  declare transporteDescargas: TransporteDescarga[];
}
export default RegistroMateriaPrima;
