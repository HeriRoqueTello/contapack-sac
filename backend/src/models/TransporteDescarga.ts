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
import RegistroMateriaPrima from "./RegistroMateriaPrima";
import Chofer from "./chofer";

@Table({
  tableName: "transporte_descarga",
  timestamps: false,
})
class TransporteDescarga extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(15),
  })
  declare placa: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(15),
  })
  declare placa2: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare empresaTransporte: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  declare guiaTransportista: string;

  //---FOREINGS KEYS
  //RegistroMateriaPrima
  @ForeignKey(() => RegistroMateriaPrima)
  declare registroMateriaPrimaId: number;
  @BelongsTo(() => RegistroMateriaPrima)
  declare RegistroMateriaPrima: RegistroMateriaPrima;

  //---CONTENEDOR DE ARRAYS
  //Chofer
  @HasMany(() => Chofer)
  declare choferes: Chofer[];
}

export default TransporteDescarga;
