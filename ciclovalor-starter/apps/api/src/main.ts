import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: (process.env.WEB_ORIGINS ?? 'http://localhost:4173,http://127.0.0.1:4173').split(',') });
  app.enableShutdownHooks();
  await app.listen(Number(process.env.PORT ?? 3001), '0.0.0.0');
  return app;
}
void bootstrap();
