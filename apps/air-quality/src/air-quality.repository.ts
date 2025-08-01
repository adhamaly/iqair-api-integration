import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from 'common/common';
import { Model, Connection } from 'mongoose';
import { AirQuality } from './schemas/air-quality.schema';

@Injectable()
export class AirQualityRepository extends AbstractRepository<AirQuality> {
  protected readonly logger = new Logger(AirQualityRepository.name);

  constructor(
    @InjectModel(AirQuality.name) airQualitiesModel: Model<AirQuality>,
    @InjectConnection() connection: Connection,
  ) {
    super(airQualitiesModel, connection);
  }
}
