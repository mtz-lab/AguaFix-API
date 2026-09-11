import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  port: env.get('PORT').default(3000).asPortNumber(),

  dbHost: env.get('DB_HOST').required().asString(),
  dbPort: env.get('DB_PORT').required().asPortNumber(),
  dbUser: env.get('DB_USER').required().asString(),
  dbPassword: env.get('DB_PASSWORD').required().asString(),
  dbName: env.get('DB_NAME').required().asString(),

  mailHost: env.get('MAIL_HOST').required().asString(),
  mailPort: env.get('MAIL_PORT').required().asPortNumber(),
  mailSecure: env.get('MAIL_SECURE').default('false').asBool(),
  mailUser: env.get('MAIL_USER').required().asString(),
  mailPassword: env.get('MAIL_PASSWORD').required().asString(),
  mailFrom: env.get('MAIL_FROM').required().asString(),

  maintenanceCrewEmail: env.get('MAINTENANCE_CREW_EMAIL').required().asString(),
};
