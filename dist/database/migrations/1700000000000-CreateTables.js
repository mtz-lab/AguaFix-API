"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1700000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateTables1700000000000 {
    constructor() {
        this.name = 'CreateTables1700000000000';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'SYSTEM_USER',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'name', type: 'varchar' },
                { name: 'email', type: 'varchar', isUnique: true },
                { name: 'password', type: 'varchar' },
                { name: 'is_notification_enabled', type: 'boolean', default: false },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'WATER_REPORT',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'address', type: 'varchar' },
                { name: 'description', type: 'varchar' },
                { name: 'severity', type: 'varchar' },
                { name: 'reporter_phone', type: 'varchar' },
                { name: 'is_resolved', type: 'boolean', default: false },
                { name: 'created_at', type: 'timestamp', default: 'now()' },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('WATER_REPORT');
        await queryRunner.dropTable('SYSTEM_USER');
    }
}
exports.CreateTables1700000000000 = CreateTables1700000000000;
//# sourceMappingURL=1700000000000-CreateTables.js.map