import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class IqAirService {
  private readonly logger = new Logger(IqAirService.name);

  constructor(private readonly configService: ConfigService) {}

  async getAirQuality(lat: number, lng: number) {
    try {
      const { data } = await axios.get(
        this.configService.get<string>('IQAIR_BASE_URL'),
        {
          params: {
            lat,
            lon: lng,
            key: this.configService.get<string>('IQAIR_API_KEY'),
          },
        },
      );

      return {
        city: data.data.city,
        location: data.data.location,
        pollution: data.data.current.pollution,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch air quality: ${error.response?.data || error.message}`,
      );
      throw error;
    }
  }
}
