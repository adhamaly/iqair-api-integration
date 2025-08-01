import { Injectable } from '@nestjs/common';
import { AirQualityRepository } from './air-quality.repository';
import {
  IqAirService,
  RabbitExchanges,
  RabbitQueues,
  RabbitRoutingKeys,
} from 'common/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { AirQualityDTO } from './dtos/air-quality.dto';
import { getMostPollutedParisTimeAggregationPipeline } from './aggregations/most-polluted-time.aggregation';
import { LocationDto } from './dtos/location.dto';

@Injectable()
export class AirQualityService {
  constructor(
    private readonly airQualityRepository: AirQualityRepository,
    private iqAirService: IqAirService,
  ) {}

  async getAirQualities({ lat, lng }: LocationDto) {
    const { pollution } = await this.iqAirService.getAirQuality(
      Number(lat),
      Number(lng),
    );
    return pollution;
  }

  @RabbitSubscribe({
    exchange: RabbitExchanges.MESSAGE_WORKER,
    routingKey: RabbitRoutingKeys.MESSAGE_WORKER_EVENTS_CHECK_AIR_QUALITY_CRON,
    queue: RabbitQueues.MESSAGE_WORKER_EVENTS_CHECK_AIR_QUALITY_CRON,
    queueOptions: {
      durable: true,
    },
    errorHandler: (channel, messages, error) => {
      console.log(`: ${error}`);
      channel.nack(messages, false, false);
    },
  })
  async saveAirQuality(airQualityDTO: AirQualityDTO) {
    await this.airQualityRepository.create({
      city: airQualityDTO.city,
      pollution: airQualityDTO.pollution,
      location: {
        type: 'Point',
        coordinates: [airQualityDTO.lng, airQualityDTO.lat],
      },
    });
  }

  async getMostPollutedParisTime() {
    const [doc] = await this.airQualityRepository.aggregate(
      getMostPollutedParisTimeAggregationPipeline(),
    );

    return doc;
  }
}
