import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min } from "class-validator";

export class EquipoDto {
    @ApiProperty({
        description: 'Nombre del ítem',
        example: 'Espada Larga'
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Cantidad del ítem',
        example: 1
    })
    @IsInt({ message: 'Cantidad debe ser un número entero' })
    @Min(0, { message: 'Cantidad no debe ser negativa' })
    cantidad: number;
}