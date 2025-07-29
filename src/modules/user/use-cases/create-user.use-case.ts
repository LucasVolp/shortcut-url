import { ConflictException, Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { CreateUserRepository, FindUserByEmailRepository } from "../repository";
import { CreateUserDto } from "../dto/create-user.dto";
import { hashPassword } from "src/shared/utils/password-hash.utils";

@Injectable()
export class CreateUserUseCase {
    constructor (
        private readonly userRepository: CreateUserRepository,
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly logger: Logger,
    ) {}

    async execute(data: CreateUserDto) {
        try {
            const userExists = await this.findUserByEmailRepository.findByEmail(data.email);

            if (userExists) {
                this.logger.error("User already exists with this email");
                throw new ConflictException("User already exists with this email");
            }

            data.password = await hashPassword(data.password);
            const user = await this.userRepository.create(data);
            this.logger.log(`User created successfully with ID: ${user.id}`);
            return user;
        } catch (err) {
            if (err instanceof ConflictException) {
                throw err;
            }
            const error = new ServiceUnavailableException("Error creating user", {
                cause: err,
                description: "Failed to create user"
            });
            this.logger.error(err.message, err.stack);
            throw error;
        }
    }
}