import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table, Unique } from "sequelize-typescript";
import Area from "./Area";
import Rol from "./Rol";

@Table({
  tableName: 'usuario'
})

class Usuario extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(150)
  })
  declare nombre: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(150)
  })
  declare apellido: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(9)
  })
  declare telefono: string

  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
  declare email: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60)
  })
  declare password: string

  @ForeignKey(() => Rol)
  declare rolId: number

  @BelongsTo(() => Rol)
  declare Rol: Rol

  @ForeignKey(() => Area)
  declare areaId: number

  @BelongsTo(() => Area)
  declare Area: Area
}

export default Usuario