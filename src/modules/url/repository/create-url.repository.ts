import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/PrismaService";
import { CreateUrlDto } from "../dto/create-url.dto";

@Injectable()
export class CreateUrlRepository {
    constructor (private readonly prisma: PrismaService) {}

    async create(data: CreateUrlDto) {
        return this.prisma.url.create({
            data,
            include: {
                user: true
            }
        })
    }
}