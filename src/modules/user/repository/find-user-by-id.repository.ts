import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/PrismaService";

@Injectable()
export class FindUserByIdRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
}