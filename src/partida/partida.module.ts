import { Module } from '@nestjs/common';
import { PartidaService } from './partida.service';
import { PartidaController } from './partida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidaEntity } from './entidad/partida.entity';
import { UsuarioEntity } from 'src/usuario/entidad/usuario.entity';
import { PersonajeEntity } from 'src/personaje/entidad/personaje.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PartidaEntity, UsuarioEntity, PersonajeEntity])],
    providers: [PartidaService],
    controllers: [PartidaController]
})
export class PartidaModule { }
