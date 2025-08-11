import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/PrismaService";

@Injectable()
export class FindUrlByShortCodeRepository {
    constructor (private readonly prisma: PrismaService) {}
    async findByShortCode(shortcode: string) {
        return this.prisma.url.findUnique({
            where: { shortCode: shortcode },
            include: {
                user: true,
                clicks: true,
            }
        });
    }
}