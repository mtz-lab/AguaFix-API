import { CreateReportDto } from '../dto/create-report.dto';

const severityLabels: Record<string, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

const severityColors: Record<string, string> = {
  low: '#2e7d32',
  medium: '#f9a825',
  high: '#c62828',
};

export function generateReportTemplate(dto: CreateReportDto, photoUrl: string): string {
  const severityLabel = severityLabels[dto.severity] ?? dto.severity;
  const severityColor = severityColors[dto.severity] ?? '#333333';

  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Nuevo reporte de fuga de agua</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f2f2f2; font-family: Arial, Helvetica, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f2f2; padding: 24px 0;">
        <tr>
          <td align="center">
            <table width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e0e0e0;">
              <tr>
                <td style="background-color:#0277bd; padding:16px 24px;">
                  <h1 style="color:#ffffff; font-size:18px; margin:0;">Nuevo reporte de fuga de agua</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:24px;">
                  <p style="font-size:14px; color:#333333; margin-top:0;">
                    Se registro un nuevo reporte ciudadano. Datos de la fuga:
                  </p>
                  <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px; color:#333333; border-collapse:collapse;">
                    <tr style="border-bottom:1px solid #eeeeee;">
                      <td style="font-weight:bold; width:140px;">Direccion</td>
                      <td>${dto.address}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee;">
                      <td style="font-weight:bold;">Descripcion</td>
                      <td>${dto.description}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee;">
                      <td style="font-weight:bold;">Severidad</td>
                      <td>
                        <span style="color:${severityColor}; font-weight:bold;">${severityLabel}</span>
                      </td>
                    </tr>
                    <tr style="border-bottom:1px solid #eeeeee;">
                      <td style="font-weight:bold;">Telefono de contacto</td>
                      <td>${dto.reporterPhone}</td>
                    </tr>
                    <tr>
                      <td style="font-weight:bold; vertical-align:top;">Foto de la fuga</td>
                      <td><img src="${photoUrl}" alt="Foto de la fuga" style="max-width:100%; border-radius:6px;" /></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background-color:#f7f7f7; padding:12px 24px;">
                  <p style="font-size:11px; color:#888888; margin:0;">
                    Este correo fue generado automaticamente por el sistema de reportes de fugas del municipio.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}