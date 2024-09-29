import { ArrayNotEmpty, MaxLength, IsString, IsNumber } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @MaxLength(35)
  regionName: string;

  @IsString()
  @MaxLength(160)
  regionAddress: string;

  @IsNumber({}, { each: true }) // Valida que cada elemento del arreglo sea un número
  @ArrayNotEmpty()
  regionLatLng: number[];
}
