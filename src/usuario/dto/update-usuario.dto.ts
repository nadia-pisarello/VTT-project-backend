import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { RolUsuarioEnum } from "../enum/rol-usuario.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUsuarioDto {
    @ApiProperty({
        description: 'DTO para actualizar un usuario',
        example: 'mariagonzalez',
        required: false
    })
    @IsOptional() @IsString()
    nombre?: string;
    @IsOptional() @IsEmail()
    email?: string;
    @IsOptional() @IsString()
    password?: string;
    @IsOptional() @IsEnum(RolUsuarioEnum)
    rol?: RolUsuarioEnum;
}
