import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import Variedad from "./Variedad";

import RegistroProduccion from "./RegistroProduccion";
//>>>>>>> main

@Table({
  tableName: "producto",
})
class Producto extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare nombre: string;
  // Relaciones con otras tablas
  // Variedad
  @ForeignKey(() => Variedad)
  declare variedadId: number;
  @BelongsTo(() => Variedad)
  declare Variedad: Variedad;
}

export default Producto;
