import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { LocationDto } from './dtos/location.dto';

@Controller('air-qualities')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get('nearest')
  async getAirQualities(@Query() locationDto: LocationDto) {
    const airQualities = await this.airQualityService.getAirQualities(
      locationDto,
    );
    return { data: { pollution: airQualities } };
  }

  @Get('most-polluted')
  async getMostPollutedParis() {
    const mostPolluted =
      await this.airQualityService.getMostPollutedParisTime();
    return { data: mostPolluted };
  }
}
