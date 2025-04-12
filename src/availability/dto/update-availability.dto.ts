import { IsDateString, IsOptional } from 'class-validator';

export class UpdateAvailabilityDto {
  @IsDateString()
  @IsOptional()
  start?: string;

  @IsDateString()
  @IsOptional()
  end?: string;
}
