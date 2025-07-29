import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { DeleteUserRepository, FindUserByIdRepository } from "../repository";
import { UserStatus } from "../types/UserStatus";

@Injectable()
export class DeleteUserUseCase {
    constructor (
        private readonly userRepository: DeleteUserRepository,
        private readonly findUserByIdRepository: FindUserByIdRepository,
        private readonly logger: Logger,
    ) {}

    async execute(id: string) {
        try {
            const userExists = await this.findUserByIdRepository.findById(id);

            if (!userExists) {
                this.logger.error("User not found");
                throw new NotFoundException("User not found");
            }

            if (userExists.status === UserStatus.DELETED) {
                this.logger.warn("User already deleted");
                throw new BadRequestException("User already deleted");
            }

            const timestamp = new Date().toISOString();
            const deletedUsername = `${userExists.username}_deleted_${timestamp}`;
            const deletedEmail = `${userExists.email}_deleted_${timestamp}`;
            const deletedUser = await this.userRepository.delete(id, deletedUsername, deletedEmail);
            this.logger.log("User deleted successfully");
            return deletedUser;
        } catch (err) {
            if (err instanceof NotFoundException || err instanceof BadRequestException) {
                throw err;
            }
            const error = new ServiceUnavailableException("Error deleting user", {
                cause: err,
                description: "Failed to delete user"
            });
            this.logger.error(err.message, err.stack);
            throw error;
        }
    }
}