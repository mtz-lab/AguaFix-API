import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no esten en el DTO
      forbidNonWhitelisted: true, // rechaza el request si mandan campos extra
      transform: true, // convierte el payload al tipo del DTO
    }),
  );

  await app.listen(envs.port);
  console.log(`Aplicacion corriendo en el puerto ${envs.port}`);
}
bootstrap();
