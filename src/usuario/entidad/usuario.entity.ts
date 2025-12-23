import { Exclude } from "class-transformer";
import { PartidaEntity } from "src/partida/entidad/partida.entity";
import { PersonajeEntity } from "src/personaje/entidad/personaje.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
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
    @OneToMany(() => PersonajeEntity, personaje => personaje.usuario)
    personajes: PersonajeEntity[];
    @OneToMany(() => PartidaEntity, partida => partida.narradorId)
    partidas: PartidaEntity[];
}
