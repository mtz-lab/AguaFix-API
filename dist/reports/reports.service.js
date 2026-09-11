"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ReportsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const reports_repository_1 = require("./repository/reports.repository");
const email_service_1 = require("../email/email.service");
const report_template_1 = require("./templates/report.template");
const envs_1 = require("../config/envs");
let ReportsService = ReportsService_1 = class ReportsService {
    constructor(reportsRepository, emailService) {
        this.reportsRepository = reportsRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(ReportsService_1.name);
    }
    async create(dto) {
        const report = this.reportsRepository.create(dto);
        const savedReport = await this.reportsRepository.save(report);
        const html = (0, report_template_1.generateReportTemplate)(dto);
        try {
            await this.emailService.sendEmail(envs_1.envs.maintenanceCrewEmail, `Nuevo reporte de fuga de agua - ${dto.address}`, html);
        }
        catch (error) {
            this.logger.error('El reporte se guardo pero el correo de aviso fallo', error);
        }
        return savedReport;
    }
    findAll() {
        return this.reportsRepository.findAll();
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = ReportsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reports_repository_1.ReportsRepository,
        email_service_1.EmailService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map