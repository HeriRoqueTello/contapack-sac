import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
  HasOne,
} from "sequelize-typescript";
import Productor from "./Productor";
import Producto from "./Producto";
import Exportador from "./Exportador";
// import Calibre from "./Calibre";
// import Categoria from "./Categoria";
import Variedad from "./Variedad";
import RegistroProduccion from "./RegistroProduccion";

@Table({
  tableName: "etiqueta",
})
class Etiqueta extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(25),
    defaultValue: "No confirmado",
  })
  declare estado: string;
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare trazabilidad: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare destino: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare fechaEmp: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare calibre: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare categoria: string;

  //--FOREINGS KEYS

  // Productor
  @ForeignKey(() => Productor)
  declare productorId: number;
  @BelongsTo(() => Productor)
  declare Productor: Productor;

  // Exportador
  @ForeignKey(() => Exportador)
  declare exportadorId: number;
  @BelongsTo(() => Exportador)
  declare Exportador: Exportador;

  // Producto
  @ForeignKey(() => Producto)
  declare productoId: number;
  @BelongsTo(() => Producto)
  declare Producto: Producto;

  // Variedad
  @ForeignKey(() => Variedad)
  declare variedadId: number;
  @BelongsTo(() => Variedad)
  declare Variedad: Variedad;

  //--RELACIÓN
  @HasOne(() => RegistroProduccion)
  declare RegistroProduccion: RegistroProduccion;

  // // Calibre
  // @ForeignKey(() => Calibre)
  // @Column
  // declare calibreId: number;
  // @BelongsTo(() => Calibre)
  // declare Calibre: Calibre;

  // // Categoria
  // @ForeignKey(() => Categoria)
  // @Column
  // declare categoriaId: number;
  // @BelongsTo(() => Categoria)
  // declare Categoria: Categoria;
}

export default Etiqueta;
