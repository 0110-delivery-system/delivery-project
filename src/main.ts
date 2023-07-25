import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder().setTitle('0110조').setDescription('화이팅!').setVersion('1.0').addTag('배달 시스템').build();
    const document = SwaggerModule.createDocument(app, config);
    app.setGlobalPrefix('api', { exclude: ['/'] });
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    });

    await app.listen(3000);
}
bootstrap();
