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
import Rotulo from "./Rotulo";
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

  //---FOREIGNS KEYS
  //Variedad
  @ForeignKey(() => Variedad)
  declare variedadId: number;
  @BelongsTo(() => Variedad)
  declare Variedad: Variedad;

  //--CONTENEDOR DE ARRAYS
  //Rotulo
  @HasOne(() => Rotulo)
  declare rotulo: Rotulo;
}

export default Producto;
