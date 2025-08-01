import { Pollution } from '../schemas/pollution.schema';

export class AirQualityDTO {
  pollution: Pollution;
  city: string;
  lat: number;
  lng: number;
}
