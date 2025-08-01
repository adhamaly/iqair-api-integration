import { Module } from '@nestjs/common';
import { IqAirService } from './iq-air.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [IqAirService],
  exports: [IqAirService],
})
export class IqAirModule {}
