import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { CrearUsuarioDto } from 'src/usuario/dto/crear-usuario.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioServ: UsuarioService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string) {
        const user = await this.usuarioServ.findByEmail(email);
        if (!user) return null;

        const matches = await bcrypt.compare(pass, user.password);
        if (!matches) return null;

        const { password, ...result } = user;
        return result;
    }

    login(usuario: any) {
        const payload = { email: usuario.email, sub: usuario.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    registro(usuario: CrearUsuarioDto) {
        return this.usuarioServ.create(usuario);
    }
}
