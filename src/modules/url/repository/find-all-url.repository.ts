import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/PrismaService";

@Injectable()
export class FindAllUrlRepository {
    constructor (private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.url.findMany({
            include: {
                user: true,
                clicks: true,
            },
            orderBy: {
                createdAt: "desc"
            }   
        })
    }
}