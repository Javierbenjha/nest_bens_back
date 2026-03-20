import 'dotenv/config'; // <--- ESTA LÍNEA DEBE SER LA PRIMERA
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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