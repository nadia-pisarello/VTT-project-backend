import { Module } from '@nestjs/common';
import { PersonajeController } from './personaje.controller';
import { PersonajeService } from './personaje.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonajeEntity } from './entidad/personaje.entity';
import { UsuarioEntity } from 'src/usuario/entidad/usuario.entity';
import { PartidaEntity } from 'src/partida/entidad/partida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonajeEntity, UsuarioEntity, PartidaEntity])],
  controllers: [PersonajeController],
  providers: [PersonajeService]
})
export class PersonajeModule { }
