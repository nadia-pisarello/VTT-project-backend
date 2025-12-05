import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CrearPartidaDto {
    @ApiProperty({
        description: 'DTO para crear una nueva partida',
        example: 'Aventura en el Bosque'
    })
    @IsString() @IsNotEmpty()
    nombre: string;

    @IsArray()
    @IsString({ each: true })
    rutasMapas: string[];
}