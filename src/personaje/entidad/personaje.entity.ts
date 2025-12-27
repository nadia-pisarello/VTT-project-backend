import { PartidaEntity } from "src/partida/entidad/partida.entity";
import { AlineamientoEnum } from "src/personaje/enum/alineamiento.enum";
import { ClaseEnum } from "src/personaje/enum/clase.enum";
import { HabilidadEnum } from "src/personaje/enum/habilidad.enum";
import { UsuarioEntity } from "src/usuario/entidad/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('personaje')
export class PersonajeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ type: 'enum', enum: AlineamientoEnum })
    alineamiento: AlineamientoEnum;

    @Column({ type: 'json' })
    habilidad: {
        nombre: HabilidadEnum;
        valor: number;
    }[];

    @Column({ type: 'enum', enum: ClaseEnum })
    clase: ClaseEnum;

    @Column({ length: 50 })
    raza: string;

    @Column()
    nivel: number;

    @Column()
    experiencia: number;

    @Column()
    puntosVida: number;

    @Column({ type: 'json', nullable: true })
    equipo: {
        nombre: string;
        cantidad: number;
    }[];

    @Column({ type: 'json', nullable: true })
    notas: string[];

    @ManyToOne(() => UsuarioEntity, usuario => usuario.personajes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuarioId' })
    usuario: UsuarioEntity;

    @ManyToOne(() => PartidaEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'partidaId' })
    partida: PartidaEntity;
}
