import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';

export class LocationDto {
  @IsNumber()
  @IsLatitude()
  @ApiProperty({ type: Number })
  lat: number;

  @IsNumber()
  @IsLongitude()
  @ApiProperty({ type: Number })
  lng: number;
}
