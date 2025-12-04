import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CrearPartidaDto {
    @IsString() @IsNotEmpty()
    nombre: string;

    @IsArray()
    @IsString({ each: true })
    rutasMapas: string[];
}