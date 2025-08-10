import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import Productor from "./Productor";
import Producto from "./Producto";
import Exportador from "./Exportador";
import Calibre from "./Calibre";
import Categoria from "./Categoria";

//jd
@Table({
  tableName: "etiqueta",
})
class Etiqueta extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  declare trazabilidad: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(25),
    defaultValue: "No confirmado",
  })
  declare estado: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    defaultValue: "China",
  })
  declare destino: string;


  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare fechaEmp: string;

 

  // Productor
  @ForeignKey(() => Productor)
  @Column
  declare productorId: number;

  @BelongsTo(() => Productor)
  declare Productor: Productor;

  // Producto
  @ForeignKey(() => Producto)
  @Column
  declare productoId: number;

  @BelongsTo(() => Producto)
  declare Producto: Producto;

  // Exportador
  @ForeignKey(() => Exportador)
  @Column
  declare exportadorId: number;

  @BelongsTo(() => Exportador)
  declare Exportador: Exportador;

  // Calibre
  @ForeignKey(() => Calibre)
  @Column
  declare calibreId: number;
  @BelongsTo(() => Calibre)
  declare Calibre: Calibre;

  // Categoria
  @ForeignKey(() => Categoria)
  @Column
  declare categoriaId: number;
  @BelongsTo(() => Categoria)
  declare Categoria: Categoria;
}

export default Etiqueta;





