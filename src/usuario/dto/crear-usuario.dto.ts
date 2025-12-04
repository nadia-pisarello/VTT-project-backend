import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RolUsuarioEnum } from "../enum/rol-usuario.enum";

export class CrearUsuarioDto {
    @IsString() @IsNotEmpty()
    nombre: string;
    @IsEmail() @IsNotEmpty()
    email: string;
    @IsString() @IsNotEmpty()
    password: string;
    @IsEnum(RolUsuarioEnum) @IsNotEmpty()
    rol: RolUsuarioEnum;
}
