import { Injectable, Logger } from '@nestjs/common';
import { ReportsRepository } from './repository/reports.repository';
import { EmailService } from '../email/email.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateReportDto): Promise<Report> {
    const report = this.reportsRepository.create(dto);
    const savedReport = await this.reportsRepository.save(report);

    const html = generateReportTemplate(dto);

    try {
      await this.emailService.sendEmail(
        envs.maintenanceCrewEmail,
        `Nuevo reporte de fuga de agua - ${dto.address}`,
        html,
      );
    } catch (error) {
      // El reporte ya quedo guardado en base de datos aunque el correo falle;
      // solo se deja constancia en el log para no romper la respuesta al ciudadano.
      this.logger.error('El reporte se guardo pero el correo de aviso fallo', error);
    }

    return savedReport;
  }

  findAll(): Promise<Report[]> {
    return this.reportsRepository.findAll();
  }
}
