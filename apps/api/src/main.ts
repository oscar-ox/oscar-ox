//src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  const whitelist = [
    'https://ox.nathanrignall.uk',
    'https://www.ox.nathanrignall.uk',
    'https://dev.ox.nathanrignall.uk',
    'https://testing.ox.nathanrignall.uk',
    'http://local.ox.nathanrignall.uk',
    'http://web.ox.local',
    'http://localhost:4000',
  ];

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS' + origin));
      }
    },
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('oscar-ox api')
    .setDescription('API description')
    .setVersion('0.1')
    .addBearerAuth()
    .addCookieAuth('refreshToken')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      withCredentials: true,
    },
  });

  await app.listen(4000);
}
bootstrap();
