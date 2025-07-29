import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UrlModule } from './modules/url/url.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UserModule, UrlModule, SharedModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
