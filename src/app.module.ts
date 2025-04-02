import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { AgentsModule } from './agents/agents.module';

@Module({
  imports: [CustomersModule, AgentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
