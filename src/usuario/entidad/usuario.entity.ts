import { Exclude } from "class-transformer";
import { PersonajeEntity } from "src/personaje/entidad/personaje.entity";
import { RolUsuarioEnum } from "src/usuario/enum/rol-usuario.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 100 })
    nombre: string;
    @Column({ unique: true })
    email: string;
    @Exclude()
    @Column({ length: 255 })
    password: string;
    @Column({ type: 'simple-enum', enum: RolUsuarioEnum, default: RolUsuarioEnum.PLAYER })
    rol: RolUsuarioEnum;
    @OneToMany(() => PersonajeEntity, personaje => personaje.usuario)
    personajes: PersonajeEntity[];
}
