import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './envs';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: envs.dbHost,
        port: envs.dbPort,
        username: envs.dbUser,
        password: envs.dbPassword,
        database: envs.dbName,
        autoLoadEntities: true,
        synchronize: false, // las tablas se crean SOLO con migraciones
      }),
    }),
  ],
})
export class DatabaseModule {}
