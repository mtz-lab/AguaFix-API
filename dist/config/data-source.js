"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: envs_1.envs.dbHost,
    port: envs_1.envs.dbPort,
    username: envs_1.envs.dbUser,
    password: envs_1.envs.dbPassword,
    database: envs_1.envs.dbName,
    synchronize: false,
    logging: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
});
//# sourceMappingURL=data-source.js.map