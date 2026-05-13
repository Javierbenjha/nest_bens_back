import 'dotenv/config'; // <--- ESTA LÍNEA DEBE SER LA PRIMERA
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  // Prefijo global para todas las rutas (/api)
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  });

  // Habilitar ValidationPipe de manera global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve campos no definidos en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían campos que no corresponden
      transform: true, // Transforma los payloads a las instancias de los DTO
    }),
  );

  // Configuración de Swagger (OpenAPI)
  const config = new DocumentBuilder()
    .setTitle('ERP & Ecommerce API')
    .setDescription('Documentación de los endpoints del backend para el ERP y Ecommerce')
    .setVersion('1.0')
    .addBearerAuth() // Soporte para Autenticación con Token (JWT)
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Mantiene el token después de recargar la página
    },
  });

  // ... resto de tu configuración
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();