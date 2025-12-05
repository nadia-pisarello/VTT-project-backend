import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdatePartidaDto {
    @ApiProperty({
        description: 'DTO para actualizar una partida',
        example: 'Aventura en la Montaña',
        required: false
    })
    @IsString() @IsOptional()
    nombre?: string;

    @IsArray()
    @IsString() @IsOptional()
    rutasMapas?: string[];
}
