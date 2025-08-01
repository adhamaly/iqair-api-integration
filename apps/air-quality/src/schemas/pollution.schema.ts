import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Pollution {
  @Prop() ts: string;
  @Prop() aqius: number;
  @Prop() mainus: string;
  @Prop() aqicn: number;
  @Prop() maincn: string;
}
