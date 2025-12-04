import { Module } from '@nestjs/common';
import { PersonajeController } from './personaje.controller';
import { PersonajeService } from './personaje.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonajeEntity } from './entidad/personaje.entity';
import { UsuarioEntity } from 'src/usuario/entidad/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonajeEntity, UsuarioEntity])],
  controllers: [PersonajeController],
  providers: [PersonajeService]
})
export class PersonajeModule { }
