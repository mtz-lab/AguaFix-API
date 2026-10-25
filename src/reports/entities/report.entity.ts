import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ReportSeverity = 'low' | 'medium' | 'high';

@Entity('WATER_REPORT')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  severity: ReportSeverity;

  @Column({ type: 'varchar', name: 'reporter_phone' })
  reporterPhone: string;

  @Column({ type: 'varchar', name: 'photo_url', nullable: true })
  photoUrl: string;

  @Column({ type: 'varchar', name: 'repair_photo_url', nullable: true })
  repairPhotoUrl: string;

  @Column({ type: 'boolean', default: false, name: 'is_resolved' })
  isResolved: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}