// src/entity/Rol.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';

@Entity('Rol') // Mapea a la tabla 'Rol' en tu base de datos
export class Rol {
  @PrimaryGeneratedColumn()
  IdRol!: number;

  @Column({ name: 'NomRol', type: 'varchar', length: 255, nullable: false }) // Ajusta la longitud según tu (?)
  NomRol!: string;

  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios!: Usuario[]; // Un Rol puede tener muchos Usuarios
}