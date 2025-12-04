import { UsuarioEntity } from "src/usuario/entidad/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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

} 