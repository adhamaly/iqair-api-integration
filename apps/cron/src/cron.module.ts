import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { JobsModule } from './jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), JobsModule],
  controllers: [],
  providers: [CronService],
})
export class CronModule {}
