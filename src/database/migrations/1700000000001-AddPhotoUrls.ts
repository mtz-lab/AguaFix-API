import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPhotoUrls1700000000001 implements MigrationInterface {
  name = 'AddPhotoUrls1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('WATER_REPORT', [
      new TableColumn({ name: 'photo_url', type: 'varchar', isNullable: true }),
      new TableColumn({ name: 'repair_photo_url', type: 'varchar', isNullable: true }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('WATER_REPORT', 'repair_photo_url');
    await queryRunner.dropColumn('WATER_REPORT', 'photo_url');
  }
}