import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Variedad from "./Variedad";
import Calibre from "./Calibre";
import Categoria from "./Categoria";

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

  // Calibre
  @ForeignKey(() => Calibre)
  declare calibreId: number;
  @BelongsTo(() => Calibre)
  declare Calibre: Calibre;

  // Categoria
  @ForeignKey(() => Categoria)
  declare categoriaId: number;
  @BelongsTo(() => Categoria)
  declare Categoria: Categoria;

  // Registro de Produccion
}

export default Producto;
