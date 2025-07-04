// src/entity/Area.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';

@Entity('Area') // Mapea a la tabla 'Area' en tu base de datos
export class Area {
  @PrimaryGeneratedColumn()
  IdArea!: number;

  @Column({ name: 'NomArea', type: 'varchar', length: 255, nullable: false }) // Ajusta la longitud según tu (?)
  NomArea!: string;

  @OneToMany(() => Usuario, usuario => usuario.area)
  usuarios!: Usuario[]; // Un Area puede tener muchos Usuarios
}