import { IsInt, IsString, Min } from "class-validator";

export class EquipoDto {
    @IsString()
    nombre: string;
    @IsInt({ message: 'Cantidad debe ser un número entero' })
    @Min(0, { message: 'Cantidad no debe ser negativa' })
    cantidad: number;
}