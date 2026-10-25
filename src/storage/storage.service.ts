import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { envs } from '../config/envs';

@Injectable()
export class StorageService {
  private readonly s3 = new S3Client({
    region: envs.awsRegion,
    credentials: {
      accessKeyId: envs.awsAccessKeyId,
      secretAccessKey: envs.awsSecretAccessKey,
    },
  });

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const key = `${folder}/${randomUUID()}-${file.originalname.replace(/\s+/g, '_')}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: envs.awsBucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    return `https://${envs.awsBucketName}.s3.${envs.awsRegion}.amazonaws.com/${key}`;
  }
}