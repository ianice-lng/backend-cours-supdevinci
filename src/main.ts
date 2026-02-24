import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildGlobalValidationPipe } from './core/http/validation/validations.pipe';
import { HttpExceptionFilter } from './core/http/exeptions/http-exception.filter';
import { ResponseInterceptor } from './core/http/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(buildGlobalValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter()); // -> transforme toutes les erreurs (DomainError, HttpException...) en { code, message, fields?, details? }
  app.useGlobalInterceptors(new ResponseInterceptor()); // -> transforme toutes les reponses OK en { data, meta? }
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('API documentation for Notes Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
