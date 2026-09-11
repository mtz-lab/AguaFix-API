import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ReportSeverity } from '../entities/report.entity';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(['low', 'medium', 'high'])
  severity: ReportSeverity;

  @IsString()
  @IsNotEmpty()
  reporterPhone: string;
}
