import { Injectable } from "@nestjs/common";
import { UrlStatus } from "generated/prisma";
import { PrismaService } from "src/shared/databases/PrismaService";

@Injectable()
export class DeleteUrlRepository {
    constructor (private readonly prisma: PrismaService) {}

    async delete(id: string) {
        return this.prisma.url.update({
            where: { id },
            data: { 
                deletedAt: new Date(),
                status: UrlStatus.DELETED,
                shortCode: `deleted-${id}`,
                originalUrl: `deleted-${id}`,
                customAlias: `deleted-${id}`,
            },
            include: {
                user: true,
                clicks: true,
            }
        });
    }
}