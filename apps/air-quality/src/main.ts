import { NestFactory } from '@nestjs/core';
import { AirQualityModule } from './air-quality.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AirQualityModule);
  // Enable Swagger
  const config = new DocumentBuilder()
    .setTitle('iq air quality APIs integration')
    .setDescription('API documentation for the iq air quality APIs integration')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('iqair-quality/docs', app, document);

  await app.listen(3000);
}
bootstrap();
