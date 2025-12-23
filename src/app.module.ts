import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { PersonajeModule } from './personaje/personaje.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PartidaModule } from './partida/partida.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: `.env.${process.env.APP_ENV || 'dev'}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>('database'),
    }),
    UsuarioModule,
    PersonajeModule,
    PartidaModule,
    AuthModule,
  ],
})
export class AppModule { }
