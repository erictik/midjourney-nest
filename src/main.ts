import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { FastifyAdapter } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 1024 * 1024 * 30, // 30MB
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 8080;
  // Disable CORS
  app.enableCors({
    origin: true,
  });
  await app.listen(port, '0.0.0.0');
  console.log('http server: http://localhost:' + port);
}
bootstrap();
