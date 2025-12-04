import { IsEnum, IsInt, IsString, Min } from "class-validator";
import { HabilidadEnum } from "../enum/habilidad.enum";

export class HabilidadDto {
    @IsEnum(HabilidadEnum)
    nombre: HabilidadEnum;
    @IsInt({ message: 'La cantidad debe ser un número entero' })
    @Min(0, { message: 'La cantidad no puede ser negativa' })
    cantidad: number;
}