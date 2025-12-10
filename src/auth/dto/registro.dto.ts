import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class RegistroDto {
    @ApiProperty()
    @IsString()
    nombre: string
    email: string
    password: string
}