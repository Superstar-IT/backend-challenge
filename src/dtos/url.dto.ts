import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class URL {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  url: string;
}
