import { Injectable, Logger, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { FindUserByIdRepository } from "../repository";

@Injectable()
export class FindUserByIdUseCase {
    constructor (
        private readonly userRepository: FindUserByIdRepository,
        private readonly logger: Logger,
    ) {}

    async execute(id: string) {
        try {
            const user = await this.userRepository.findById(id);

            if (!user) {
                throw new NotFoundException("User not found");
            }
            this.logger.log("User found!");
            return user;
        } catch (err) {
            if (err instanceof NotFoundException) {
                throw err;
            }
            const error = new ServiceUnavailableException("Error retrieving user", {
                cause: err,
                description: "Failed to retrieve user"
            });
            this.logger.error(err.message, err.stack);
            throw error;
        }
    }
}