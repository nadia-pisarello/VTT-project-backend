import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";
import { EquipoDto } from "./equipo.dto";
import { HabilidadDto } from "./habilidad.dto";
import { AlineamientoEnum } from "../enum/alineamiento.enum";
import { ClaseEnum } from "../enum/clase.enum";

export class CrearPersonajeDto {

    @IsString() @IsNotEmpty()
    nombre: string;

    @IsEnum(AlineamientoEnum) @IsNotEmpty()
    alinamiento: AlineamientoEnum;

    @IsArray()
    @ValidateNested({ each: true }) @IsNotEmpty()
    @Type(() => HabilidadDto)
    habilidad: HabilidadDto[];

    @IsEnum(ClaseEnum) @IsNotEmpty()
    clase: ClaseEnum;

    @IsString() @IsNotEmpty()
    raza: string;

    @IsInt({ message: 'El nivel debe ser un entero' })
    @Min(1, { message: 'El nivel mínimo es 1' })
    nivel: number;

    @IsNotEmpty() @IsNumber({}, { message: 'La experiencia debe ser un número' })
    @Min(0, { message: 'La experiencia no puede ser negativa' })
    experiencia: number;

    @IsNotEmpty() @IsNumber()
    puntosVida: number;

    @IsArray()
    @ValidateNested({ each: true }) @IsNotEmpty()
    @Type(() => EquipoDto)
    equipo: EquipoDto[];

    @IsArray()
    @IsString({ each: true })
    notas: string[];
}
