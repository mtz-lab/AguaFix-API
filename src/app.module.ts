import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { EmailModule } from './email/email.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, EmailModule, UsersModule, AuthModule, ReportsModule],
})
export class AppModule {}
