import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioServ: UsuarioService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const usuario = await this.usuarioServ.findByEmail(email);
        if (usuario && usuario.password === password) {
            const { password, ...result } = usuario;
            return result;
        }
        return null;
    }

    async login(usuario: any) {
        const payload = { email: usuario.email, sub: usuario.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
