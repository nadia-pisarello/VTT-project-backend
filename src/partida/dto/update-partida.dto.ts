import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdatePartidaDto {
    @ApiProperty({
        description: 'Nombre actualizado de la partida',
        example: 'Aventura en la Montaña',
        required: false
    })
    @IsString() @IsOptional()
    nombre?: string;

    @ApiProperty({
        description: 'Rutas actualizadas de los mapas asociados a la partida',
        example: ['mapa3.png', 'mapa4.png'],
        required: false
    })
    @IsArray()
    @IsString() @IsOptional()
    rutasMapas?: string[];
}
