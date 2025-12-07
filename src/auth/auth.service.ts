import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(private readonly usuarioServ: UsuarioService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const usuario = await this.usuarioServ.findByEmail(email);
        if (usuario && usuario.password === password) {
            const { password, ...result } = usuario;
            return result;
        }
        return null;
    }
}
