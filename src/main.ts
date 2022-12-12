import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ejercicio')
    .setDescription('Prueba interside ')
    .setVersion('0.0.1')
    .addTag('compra')
    .addTag('cuenta')
    .addTag('saldo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docu', app, document);

  await app.listen(3000);
}
bootstrap();
