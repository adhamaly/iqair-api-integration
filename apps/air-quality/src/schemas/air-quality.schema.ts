import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Pollution } from './pollution.schema';
import { AbstractDocument } from 'common/common';

@Schema({ timestamps: true })
export class AirQuality extends AbstractDocument {
  @Prop() city: string;

  @Prop() lat: number;

  @Prop() lng: number;

  @Prop({ type: Pollution })
  @Type(() => Pollution)
  pollution: Pollution;

  @Prop() timestamp: Date;
}

export const AirQualitySchema = SchemaFactory.createForClass(AirQuality);
