import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CrearPartidaDto {
    @ApiProperty({
        description: 'Nombre de la partida',
        example: 'Aventura en el Bosque'
    })
    @IsString() @IsNotEmpty()
    nombre: string;
}