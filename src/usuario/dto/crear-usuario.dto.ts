import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator";
import { RolUsuarioEnum } from "../enum/rol-usuario.enum";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('Crear Usuario')
export class CrearUsuarioDto {
    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'juanperez'
    })
    @IsString() @IsNotEmpty()
    nombre: string;

    @ApiProperty({
        description: 'Email del usuario',
        example: 'juan@example.com'
    })
    @IsEmail() @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'securePassword123'
    })
    @IsString() @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({
        description: 'Rol del usuario',
        example: RolUsuarioEnum.DM
    })
    @IsEnum(RolUsuarioEnum) @IsOptional()
    rol: RolUsuarioEnum;
}
