import { Injectable, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.config.get<string>('TYPEORM_CONNECTION') as 'postgres',
      username: this.config.get<string>('TYPEORM_USERNAME'),
      password: this.config.get<string>('TYPEORM_PASSWORD'),
      database: this.config.get<string>('TYPEORM_DATABASE'),
      port: this.config.get<number>('TYPEORM_PORT'),
      host: this.config.get<string>('DATABASE_HOST'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    }
  }
}
