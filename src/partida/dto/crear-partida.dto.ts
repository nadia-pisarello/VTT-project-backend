import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CrearPartidaDto {
    @ApiProperty({
        description: 'Nombre de la partida',
        example: 'Aventura en el Bosque'
    })
    @IsString() @IsNotEmpty()
    nombre: string;

    @ApiProperty({
        description: 'Rutas de los mapas asociados a la partida',
        example: ['mapa1.png', 'mapa2.png   ']
    })
    @IsArray()
    @IsString({ each: true })
    rutasMapas: string[];
}