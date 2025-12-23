import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUsuarioDto {
    @ApiProperty({
        description: 'nuevo nombre de usuario',
        example: 'mariagonzalez',
        required: false
    })
    @IsOptional() @IsString()
    nombre?: string;
    @ApiProperty({
        description: 'nuevo email de usuario',
        example: 'otro.email@example.com',
        required: false
    })
    @IsOptional() @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'nueva contraseña de usuario',
        example: 'newSecurePassword456',
        required: false
    })
    @IsOptional() @IsString()
    password?: string;

}
