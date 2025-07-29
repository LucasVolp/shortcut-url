import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/databases/PrismaService";
import { UserStatus } from "../types/UserStatus";

@Injectable()
export class DeleteUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async delete(id: string, newUsername: string, newEmail: string) {
        return this.prisma.user.update({
            where: { id },
            data: { 
                deletedAt: new Date(),
                status: UserStatus.DELETED,
                username: newUsername,
                email: newEmail,
             },
        })
    }
}