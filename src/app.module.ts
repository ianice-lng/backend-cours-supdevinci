import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './contexts/profile/profile.module';
import { AuthModule } from './contexts/auth/auth.module';
import { MessageModule } from './contexts/message/message.module';
import { ResourceModule } from './contexts/resource/resources.module';
import { SearchModule } from './contexts/search/search.module';
import { ConversationModule } from './contexts/conversation/conversation.module';
@Module({
  imports: [ProfileModule, AuthModule, MessageModule, ResourceModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
