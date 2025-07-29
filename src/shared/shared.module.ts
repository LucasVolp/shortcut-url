import { Global, Logger, Module } from "@nestjs/common";
import { PrismaService } from "./databases/PrismaService";

@Global()
@Module({
    imports: [],
    providers: [PrismaService, Logger],
    exports: [PrismaService],
})
export class SharedModule {}