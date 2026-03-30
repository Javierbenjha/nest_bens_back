import 'dotenv/config'; // <--- ESTA LÍNEA DEBE SER LA PRIMERA
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Desactivar bodyParser por defecto para poder configurarlo manualmente con límites mayores
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  // Configurar límites de tamaño para JSON y URLEncoded manualmente
  const express = require('express');
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Habilitar CORS para permitir peticiones del frontend (ej. localhost:5173)
  app.enableCors();

  // Habilitar ValidationPipe de manera global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve campos no definidos en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían campos que no corresponden
      transform: true, // Transforma los payloads a las instancias de los DTO
    }),
  );

  // ... resto de tu configuración
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();