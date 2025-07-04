// src/entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from './Rol';
import { Area } from './Area';

@Entity('Usuario') // Mapea a la tabla 'Usuario' en tu base de datos
export class Usuario {
  @PrimaryGeneratedColumn()
  IdUsuario!: number;

  @Column({ name: 'Nombres', type: 'varchar', length: 255, nullable: false }) // Ajusta la longitud si es diferente en tu DB
  Nombres!: string;

  @Column({ name: 'Apellido', type: 'varchar', length: 255, nullable: false }) // Ajusta la longitud si es diferente en tu DB
  Apellido!: string;

  @Column({ name: 'Telefono', type: 'varchar', length: 255, nullable: true })
  Telefono!: string | null;

  @Column({ name: 'Email', type: 'varchar', length: 255, unique: true, nullable: true }) // Añadido unique: true para el email
  Email!: string | null;

  @Column({ name: 'Estado', type: 'boolean', default: true })
  Estado!: boolean;

  // --- Nueva columna para la contraseña ---
  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false }) // Columna para la contraseña
  password!: string;
  // --- Fin nueva columna ---

  // Relación Many-to-One con Rol
  @ManyToOne(() => Rol, rol => rol.usuarios)
  @JoinColumn({ name: 'IdRol' }) // Clave foránea en la tabla Usuario
  rol!: Rol; // Propiedad para el objeto Rol relacionado

  @Column({ name: 'IdRol', nullable: true }) // Columna para el IdRol directo
  IdRol!: number | null;

  // Relación Many-to-One con Area
  @ManyToOne(() => Area, area => area.usuarios)
  @JoinColumn({ name: 'IdArea' }) // Clave foránea en la tabla Usuario
  area!: Area; // Propiedad para el objeto Area relacionado

  @Column({ name: 'IdArea', nullable: true }) // Columna para el IdArea directo
  IdArea!: number | null;
}