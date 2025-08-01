import { Controller, Get } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';

@Controller('air-qualities')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get()
  async getAirQualities() {
    return this.airQualityService.getAirQualities();
  }
}
