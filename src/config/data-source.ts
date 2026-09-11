import { DataSource } from 'typeorm';
import { envs } from './envs';

// Este DataSource lo usa SOLO el CLI de TypeORM para generar/correr migraciones.
// La app en tiempo de ejecución usa TypeOrmModule.forRootAsync (ver database.module.ts).
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.dbHost,
  port: envs.dbPort,
  username: envs.dbUser,
  password: envs.dbPassword,
  database: envs.dbName,
  synchronize: false,
  logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
});
