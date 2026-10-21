import 'reflect-metadata';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let application: Promise<INestApplication> | undefined;

async function createApplication(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.setGlobalPrefix('api');
  app.enableCors({ origin: (process.env.WEB_ORIGINS ?? 'http://localhost:4173,http://127.0.0.1:4173').split(',') });
  await app.init();
  return app;
}

function getApplication(): Promise<INestApplication> {
  // Concurrent cold-start requests must share the same initialization.
  return application ??= createApplication();
}

// Vercel loads this function and supplies the HTTP request and response.
export default async function handler(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const app = await getApplication();
  app.getHttpAdapter().getInstance()(request, response);
}

async function bootstrap(): Promise<void> {
  const app = await getApplication();
  app.enableShutdownHooks();
  await app.listen(Number(process.env.PORT ?? 3001), '0.0.0.0');
}

// Local npm scripts still start a standalone HTTP server.
if (process.env.VERCEL !== '1') void bootstrap();
