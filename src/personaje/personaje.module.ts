import { Module } from '@nestjs/common';
import { PersonajeController } from './personaje.controller';
import { PersonajeService } from './personaje.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonajeEntity } from './entidad/personaje.entity/personaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonajeEntity])],
  controllers: [PersonajeController],
  providers: [PersonajeService]
})
export class PersonajeModule { }
