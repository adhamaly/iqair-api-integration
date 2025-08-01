import { Injectable } from '@nestjs/common';
import { AirQualityRepository } from './air-quality.repository';

@Injectable()
export class AirQualityService {
  constructor(private readonly airQualityRepository: AirQualityRepository) {}

  async getAirQualities() {
    return await this.airQualityRepository.find({});
  }
}
