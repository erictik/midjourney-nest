import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MidjourneyService } from './midjourney.service';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [AppController],
  providers: [MidjourneyService],
})
export class AppModule {}
