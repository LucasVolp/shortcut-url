import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/PrismaService";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UpdateUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async update(id: string, data: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }
}