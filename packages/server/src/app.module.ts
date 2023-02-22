import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { getEnvPath } from './common/helpers/env.helper'

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`)

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
