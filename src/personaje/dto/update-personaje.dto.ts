import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min, Validate, ValidateNested } from "class-validator";
import { AlineamientoEnum } from "../enum/alineamiento.enum";
import { Type } from "class-transformer";
import { HabilidadDto } from "./habilidad.dto";
import { EquipoDto } from "./equipo.dto";
import { ClaseEnum } from "../enum/clase.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePersonajeDto {
    @ApiProperty({
        description: 'Nuevo nombre del personaje',
        example: 'El Rufián',
        required: false
    })
    @IsOptional() @IsString()
    nombre?: string;

    @ApiProperty({
        description: 'Nuevo alineamiento del personaje',
        example: 'CM',
        required: false
    })
    @IsOptional() @IsEnum(AlineamientoEnum)
    alineamiento?: AlineamientoEnum;

    @ApiProperty({
        description: 'Nuevas habilidades del personaje',
        type: [HabilidadDto],
        example: [
            {
                nombre: 'FUE',
                valor: 16
            },
            {
                nombre: 'DES',
                valor: 12
            }
        ],
        required: false
    })
    @IsArray()
    @IsOptional() @ValidateNested({ each: true })
    @Type(() => HabilidadDto)
    habilidad?: HabilidadDto[];

    @ApiProperty({
        description: 'Nueva clase del personaje',
        example: 'MAGO',
        required: false
    })
    @IsOptional() @IsEnum(ClaseEnum)
    clase?: ClaseEnum;

    @ApiProperty({
        description: 'Nueva raza del personaje',
        example: 'Enano',
        required: false
    })
    @IsOptional() @IsString()
    raza?: string;

    @ApiProperty({
        description: 'Nuevo nivel del personaje',
        example: 6,
        required: false
    })
    @IsOptional() @IsInt()
    nivel?: number;

    @ApiProperty({
        description: 'Nueva experiencia del personaje',
        example: 2000,
        required: false
    })
    @IsOptional() @IsNumber({}, { message: 'La experiencia debe ser un número' })
    @Min(0, { message: 'La experiencia no puede ser negativa' })
    experiencia?: number;

    @ApiProperty({
        description: 'Nuevos puntos de vida del personaje',
        example: 50,
        required: false
    })
    @IsOptional() @IsNumber({}, { message: 'Los puntos de vida deben ser un número' })
    puntosVida?: number;

    @ApiProperty({
        description: 'Nuevo equipo del personaje',
        type: [EquipoDto],
        example: [
            {
                nombre: 'Escudo de madera',
                cantidad: 1
            },
        ],
        required: false
    })
    @IsArray()
    @IsOptional() @ValidateNested({ each: true })
    @Type(() => EquipoDto)
    equipo?: EquipoDto[]

    @ApiProperty({
        description: 'Nuevas notas adicionales del personaje',
        example: ['Nota 1', 'Nota 2'],
        required: false
    })
    @IsArray()
    @IsOptional()
    notas?: string[];
}
