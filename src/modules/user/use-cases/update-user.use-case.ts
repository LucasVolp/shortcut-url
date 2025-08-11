import { Injectable, Logger, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { FindUserByIdRepository, UpdateUserRepository } from "../repository";
import { UpdateUserDto } from "../dto/update-user.dto";
import { hashPassword } from "src/shared/utils/password-hash.utils";

@Injectable()
export class UpdateUserUseCase {
    constructor (
        private readonly userRepository: UpdateUserRepository,
        private readonly findUserByIdRepository: FindUserByIdRepository,
        private readonly logger: Logger,
    ) {}

    async execute(id: string, data: UpdateUserDto) {
        try {
            const userExists = await this.findUserByIdRepository.findById(id);

            if (!userExists) {
                this.logger.error("User not found");
                throw new NotFoundException("User not found");
            }

            if (data.password) {
                data.password = await hashPassword(data.password);
            }

            const updatedUser = await this.userRepository.update(id, data);
            this.logger.log("User updated successfully");
            return updatedUser;
        } catch (err) {
            if (err instanceof NotFoundException) {
                throw err;
            }
            const error = new ServiceUnavailableException("Something bad happened while updating user", {
                cause: err,
                description: "Failed to update user"
            });
            this.logger.error(err.message, err.stack);
            throw error;
        }
    }
}