import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './contexts/profile/profile.module';
import { AuthModule } from './contexts/auth/auth.module';
@Module({
  imports: [ProfileModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
