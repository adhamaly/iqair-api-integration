import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Pollution } from './pollution.schema';
import { AbstractDocument } from 'common/common';

@Schema({ timestamps: true })
export class AirQuality extends AbstractDocument {
  @Prop() city: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'], // Only 'Point' allowed
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  })
  location: {
    type: 'Point';
    coordinates: number[];
  };

  @Prop({ type: Pollution })
  @Type(() => Pollution)
  pollution: Pollution;
}

export const AirQualitySchema = SchemaFactory.createForClass(AirQuality);

AirQualitySchema.index({ location: '2dsphere' });
