import { NestFactory } from '@nestjs/core';
import { AirQualityModule } from './air-quality.module';

async function bootstrap() {
  const app = await NestFactory.create(AirQualityModule);
  await app.listen(3000);
}
bootstrap();
