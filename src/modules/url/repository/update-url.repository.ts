import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/PrismaService";
import { UpdateUrlDto } from "../dto/update-url.dto";

@Injectable()
export class UpdateUrlRepository {
    constructor (private readonly prisma: PrismaService) {}

    async update(id: string, data: UpdateUrlDto) {
        return this.prisma.url.update({
            where: { id },
            data,
            include: {
                user: true
            }
        });
    }
}