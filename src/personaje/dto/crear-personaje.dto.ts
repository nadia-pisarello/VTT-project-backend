import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";
import { EquipoDto } from "./equipo.dto";
import { HabilidadDto } from "./habilidad.dto";
import { AlineamientoEnum } from "../enum/alineamiento.enum";
import { ClaseEnum } from "../enum/clase.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CrearPersonajeDto {

    @ApiProperty({
        description: 'Nombre del personaje',
        example: 'Bustamante'
    })
    @IsString() @IsNotEmpty()
    nombre: string;

    @ApiProperty({
        description: 'Alineamiento del personaje',
        example: 'Legal Bueno'
    })
    @IsEnum(AlineamientoEnum) @IsNotEmpty()
    alineamiento: AlineamientoEnum;

    @ApiProperty({
        description: 'Habilidades del personaje',
        type: [HabilidadDto],
        example: [
            {
                nombre: 'Fuerza',
                valor: 18
            },
            {
                nombre: 'Destreza',
                valor: 14
            },
            {
                nombre: 'Constitución',
                valor: 14
            }, {
                nombre: 'Inteligencia',
                valor: 14
            }, {
                nombre: 'Sabiduría',
                valor: 14
            }, {
                nombre: 'Carisma',
                valor: 14
            },
        ]
    })
    @IsArray()
    @ValidateNested({ each: true }) @IsNotEmpty()
    @Type(() => HabilidadDto)
    habilidad: HabilidadDto[];

    @ApiProperty({
        description: 'Clase del personaje',
        example: 'Guerrero'
    })
    @IsEnum(ClaseEnum) @IsNotEmpty()
    clase: ClaseEnum;

    @ApiProperty({
        description: 'Raza del personaje',
        example: 'Elfo'
    })
    @IsString() @IsNotEmpty()
    raza: string;

    @ApiProperty({
        description: 'Nivel del personaje',
        example: 5
    })
    @IsNotEmpty()
    @IsInt({ message: 'El nivel debe ser un entero' })
    @Min(1, { message: 'El nivel mínimo es 1' })
    nivel: number;

    @ApiProperty({
        description: 'Experiencia del personaje',
        example: 1500
    })
    @IsNotEmpty() @IsNumber({}, { message: 'La experiencia debe ser un número' })
    @Min(0, { message: 'La experiencia no puede ser negativa' })
    experiencia: number;

    @ApiProperty({
        description: 'Puntos de vida del personaje',
        example: 45
    })
    @IsNotEmpty() @IsNumber()
    puntosVida: number;

    @ApiProperty({
        description: 'Equipo del personaje',
        type: [EquipoDto],
        example: [
            {
                nombre: 'Espada Larga',
                cantidad: 1
            },
            {
                nombre: 'Escudo',
                cantidad: 1
            }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true }) @IsNotEmpty()
    @Type(() => EquipoDto)
    equipo: EquipoDto[];

    @ApiProperty({
        description: 'Notas adicionales del personaje',
        example: ['Cuasimodo es un minotauro con problemas de desarrollo', 'Leona tiene una cicatriz en la mejilla']
    })
    @IsArray()
    @IsString({ each: true })
    notas: string[];
}
