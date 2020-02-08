import { NestFactory } from '@nestjs/core';
import { FastifyAdapter,  NestFastifyApplication,} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  initSwagger(app);
  await app.listen(3000);
}

async function initSwagger(app: NestFastifyApplication) {
  const options = new DocumentBuilder()
    .setDescription('Cashback APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}


bootstrap();
