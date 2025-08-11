import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { CreateUrlRepository } from "../repository";
import { CreateUrlDto } from "../dto/create-url.dto";

@Injectable()
export class CreateUrlUseCase {
    constructor (
        private readonly urlRepository: CreateUrlRepository,
        private readonly logger: Logger,
    ) {}

    async execute(data: CreateUrlDto) {
        try {
            const url = await this.urlRepository.create(data);
            this.logger.log("URL created successfully!");
            return url;
        } catch (err) {
            const error = new ServiceUnavailableException("Something bad happened while creating the URL", {
                cause: err,
                description: "Failed to create URL"
            });
            this.logger.error(err.message, err.stack);
            throw error;
        }
    }
}