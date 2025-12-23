import { UsuarioEntity } from "src/usuario/entidad/usuario.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('partida')
export class PartidaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ type: 'json', nullable: true })
    rutasMapas: string[];

    @ManyToOne(() => UsuarioEntity, usuario => usuario.partidas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'narradorId' })
    narradorId: UsuarioEntity;

    @ManyToMany(() => UsuarioEntity)
    @JoinTable({
        name: 'partida_jugadores',
        joinColumn: { name: 'partidaId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'usuarioId', referencedColumnName: 'id' },
    })
    jugadores: UsuarioEntity[];

    @Column({ unique: true })
    linkAcceso: string;

    @Column({ type: 'json', default: [] })
    solicitudesPendientes: { usuarioId: number; nombreUsuario: string }[];
} 