import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'area'
})

class Area extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
  declare descripcion: string
}

export default Area