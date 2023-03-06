import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  })
  const config = await app.get(ConfigService)
  const port = config.get<number>('PORT')

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const configSwagger = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('The notes API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, configSwagger)

  SwaggerModule.setup('api', app, document)

  await app.listen(port || 3001, () => {
    console.log(port)
  })
}
bootstrap()
