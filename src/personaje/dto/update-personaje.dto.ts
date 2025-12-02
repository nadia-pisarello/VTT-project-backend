import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min, Validate, ValidateNested } from "class-validator";
import { AlineamientoEnum } from "../enum/alineamiento.enum";
import { Type } from "class-transformer";
import { HabilidadDto } from "./habilidad.dto";
import { EquipoDto } from "./equipo.dto";
import { ClaseEnum } from "../enum/clase.enum";

export class UpdatePersonajeDto {

    @IsOptional() @IsString()
    nombre?: string;

    @IsOptional() @IsEnum(AlineamientoEnum)
    alineamiento?: AlineamientoEnum;

    @IsArray()
    @IsOptional() @ValidateNested({ each: true })
    @Type(() => HabilidadDto)
    habilidad?: HabilidadDto[];

    @IsOptional() @IsEnum(ClaseEnum)
    clase?: ClaseEnum;

    @IsOptional() @IsString()
    raza?: string;

    @IsOptional() @IsInt()
    nivel?: number;

    @IsOptional() @IsNumber({}, { message: 'La experiencia debe ser un número' })
    @Min(0, { message: 'La experiencia no puede ser negativa' })
    experiencia?: number;

    @IsOptional() @IsNumber({}, { message: 'Los puntos de vida deben ser un número' })
    puntosVida?: number;

    @IsArray()
    @IsOptional() @ValidateNested({ each: true })
    @Type(() => EquipoDto)
    equipo?: EquipoDto[]

    @IsArray()
    @IsOptional()
    notas?: string[];
}
