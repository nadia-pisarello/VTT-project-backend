import { Module } from '@nestjs/common';
import { PartidaService } from './partida.service';
import { PartidaController } from './partida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidaEntity } from './entidad/partida.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PartidaEntity])],
    providers: [PartidaService],
    controllers: [PartidaController]
})
export class PartidaModule { }
