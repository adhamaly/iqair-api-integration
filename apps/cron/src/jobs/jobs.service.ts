import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  IqAirService,
  RabbitExchanges,
  RabbitRoutingKeys,
} from 'common/common';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    private iqAirService: IqAirService,
    private readonly configService: ConfigService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async getParisZoneAirQuality() {
    this.logger.debug('Running cron job every minute!');

    const parisZoneAirQuality = await this.iqAirService.getAirQuality(
      Number(this.configService.get<string>('PARIS_ZONE_LAT')),
      Number(this.configService.get<string>('PARIS_ZONE_LNG')),
    );

    // Publish Message for save air quality
    await this.amqpConnection.publish(
      RabbitExchanges.MESSAGE_WORKER,
      RabbitRoutingKeys.MESSAGE_WORKER_EVENTS_CHECK_AIR_QUALITY_CRON,
      {
        city: parisZoneAirQuality.city,
        pollution: parisZoneAirQuality.pollution,
        lat: parisZoneAirQuality.location.coordinates[1],
        lng: parisZoneAirQuality.location.coordinates[0],
      },
    );
  }
}
