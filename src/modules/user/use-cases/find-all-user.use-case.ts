import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { FindAllUserRepository } from "../repository";

@Injectable()
export class FindAllUserUseCase {
    constructor (
        private readonly userRepository: FindAllUserRepository,
        private readonly logger: Logger,
    ) {}

    async execute() {
        try {
            const users = await this.userRepository.findAll();

            if (users.length === 0) {
                this.logger.error("No users found");
                return users;
            }

            this.logger.log(`Found ${users.length} users`);
            return users;
        } catch (err) {
            const error = new ServiceUnavailableException("Error retrieving users", {
                cause: err,
                description: "Failed to retrieve users"
            });
            this.logger.error(err.message, err.stack);
            throw error;
        }
    }
}