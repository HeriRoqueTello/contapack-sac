import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
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

  //Foreign key para RegistroMateriaPrima
  @ForeignKey(() => RegistroMateriaPrima)
  declare registroMateriaPrimaId: number;
  @BelongsTo(() => RegistroMateriaPrima)
  declare registroMateriaPrima: RegistroMateriaPrima;

  //Foreign key para Chofer
  @ForeignKey(() => Chofer)
  declare choferId: number;
  @BelongsTo(() => Chofer)
  declare chofer: Chofer;
}

export default TransporteDescarga;
