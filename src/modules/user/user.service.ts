import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase, DeleteUserUseCase, FindUserByEmailUseCase, FindUserByIdUseCase, UpdateUserUseCase } from './use-cases';
import { FindAllUserUseCase } from './use-cases/find-all-user.use-case';

@Injectable()
export class UserService {
  constructor (
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findAllUsersUseCase: FindAllUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}
  async create(data: CreateUserDto) {
    return await this.createUserUseCase.execute(data);
  }

  async findAll() {
    return await this.findAllUsersUseCase.execute();
  }

  async findByEmail(email: string) {
    return await this.findUserByEmailUseCase.execute(email);
  }

  async findOne(id: string) {
    return await this.findUserByIdUseCase.execute(id);
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.updateUserUseCase.execute(id, data);
  }

  async remove(id: string) {
    return await this.deleteUserUseCase.execute(id);
  }
}
