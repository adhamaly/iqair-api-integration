import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { IqAirModule, SharedRabbitMQModule } from 'common/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SharedRabbitMQModule, ConfigModule, IqAirModule],
  providers: [JobsService],
})
export class JobsModule {}
