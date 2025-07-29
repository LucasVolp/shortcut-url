import { Injectable, Logger, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { FindUserByEmailRepository } from "../repository";

@Injectable()
export class FindUserByEmailUseCase {
    constructor (
        private readonly userRepository: FindUserByEmailRepository,
        private readonly logger: Logger,
    ) {}

    async execute(email: string) {
        try {
            const user = await this.userRepository.findByEmail(email);

            if (!user) {
                this.logger.error("User not found with this email");
                throw new NotFoundException("User not found with this email");
            }

            this.logger.log("User found by email");
            return user;
        } catch (err) {
            if (err instanceof NotFoundException) {
                throw err;
            }
            const error = new ServiceUnavailableException("Error retrieving user by email", {
                cause: err,
                description: "Failed to retrieve user by email"
            });
            this.logger.error(err.message, err.stack);
            throw error;
        }
    }
}