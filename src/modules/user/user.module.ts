import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  controllers: [UserController],
  providers: [UserService, ...usecases, ...repositories, Logger],
})
export class UserModule {}
