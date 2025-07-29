import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/PrismaService";

@Injectable()
export class FindAllUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.user.findMany();
    }
}