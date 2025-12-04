import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { PersonajeModule } from './personaje/personaje.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidaModule } from './partida/partida.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuarioModule,
    PersonajeModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PartidaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
