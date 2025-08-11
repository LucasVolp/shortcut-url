import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/PrismaService";

@Injectable() 
export class FindUrlByIdRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string) {
        return this.prisma.url.findUnique({
            where: { id },
            include: {
                user: true,
                clicks: true,
            }
        });
    }
}