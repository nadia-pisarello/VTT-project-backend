import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(contextt) {
        console.log('JwtAuthGuard: canActivate called');
        return super.canActivate(contextt);

    }
}