import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { PersonajeModule } from './personaje/personaje.module';

@Module({
  imports: [ConfigModule.forRoot(), UsuarioModule, PersonajeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
