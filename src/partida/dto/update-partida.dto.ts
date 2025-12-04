import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdatePartidaDto {
    @IsString() @IsOptional()
    nombre?: string;

    @IsArray()
    @IsString() @IsOptional()
    rutasMapas?: string[];
}
