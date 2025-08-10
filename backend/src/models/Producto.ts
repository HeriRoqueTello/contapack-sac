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
//<<<<<<< juan16
//import Calibre from "./Calibre";
//import Categoria from "./Categoria";
//=======
import Calibre from "./Calibre";
import Categoria from "./Categoria";
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

  @ForeignKey(() => Calibre)
  declare calibreId: number;
  @BelongsTo(() => Calibre)
  declare Calibre: Calibre;

  @ForeignKey(() => Categoria)
  declare categoriaId: number;
  @BelongsTo(() => Categoria)
  declare Categoria: Categoria;

  @HasOne(() => RegistroProduccion)
  declare RegistroProduccion: RegistroProduccion;
}

export default Producto;
