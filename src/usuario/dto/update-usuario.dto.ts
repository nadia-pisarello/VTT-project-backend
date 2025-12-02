import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { RolUsuarioEnum } from "../enum/rol-usuario.enum";

export class UpdateUsuarioDto {
    @IsOptional() @IsString()
    nombre?: string;
    @IsOptional() @IsEmail()
    email?: string;
    @IsOptional() @IsString()
    password?: string;
    @IsOptional() @IsEnum(RolUsuarioEnum)
    rol?: RolUsuarioEnum;
}
