import { IsEnum, IsInt, Min } from "class-validator";
import { HabilidadEnum } from "../enum/habilidad.enum";
import { ApiProperty } from "@nestjs/swagger";

export class HabilidadDto {
    @ApiProperty({
        description: 'Nombre de la habilidad',
        example: HabilidadEnum.FUE
    })
    @IsEnum(HabilidadEnum)
    nombre: HabilidadEnum;

    @ApiProperty({
        description: 'Valor de la habilidad',
        example: 18
    })
    @IsInt({ message: 'La cantidad debe ser un número entero' })
    @Min(0, { message: 'La cantidad no puede ser negativa' })
    valor: number;
}