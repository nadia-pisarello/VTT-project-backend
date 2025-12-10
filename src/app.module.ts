import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { PersonajeModule } from './personaje/personaje.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidaModule } from './partida/partida.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.SECRET ? `.development.env.${process.env.SECRET}` : '.development.env',
    }),
    UsuarioModule,
    PersonajeModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PartidaModule,
    AuthModule,
  ],
})
export class AppModule { }
