import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { AgentsModule } from './agents/agents.module';
import { Customer } from './customers/entities/customer.entity';
import { Agent } from './agents/entities/agent.entity';
import { DatabaseConfig } from './config/env.interface';

function validateDatabaseConfig(config: ConfigService): DatabaseConfig {
  const host = config.get<string>('DB_HOST');
  const port = config.get<number>('DB_PORT');
  const username = config.get<string>('DB_USERNAME');
  const password = config.get<string>('DB_PASSWORD');
  const database = config.get<string>('DB_DATABASE');

  if (!host || !port || !username || !password || !database) {
    throw new Error('Database configuration is incomplete. Please check your .env file.');
  }

  return {
    host,
    port,
    username,
    password,
    database,
  };
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...validateDatabaseConfig(new ConfigService()),
      entities: [Customer, Agent],
      synchronize: true, // 개발 환경에서만 사용. 프로덕션에서는 false로 설정
    }),
    CustomersModule,
    AgentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
