import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'rol'
})

class Rol extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
  declare descripcion: string
}

export default Rol