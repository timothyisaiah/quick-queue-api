import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAvailabilityDto {
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @IsDateString()
  @IsNotEmpty()
  end: string;
}
