import { Module } from '@nestjs/common';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { DatabaseModule, SharedRabbitMQModule } from 'common/common';
import { AirQualityRepository } from './air-quality.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQuality, AirQualitySchema } from './schemas/air-quality.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: AirQuality.name, schema: AirQualitySchema },
    ]),
    SharedRabbitMQModule,
  ],
  controllers: [AirQualityController],
  providers: [AirQualityRepository, AirQualityService],
})
export class AirQualityModule {}
