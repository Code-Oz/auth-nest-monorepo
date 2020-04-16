import { Module, Global } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { applyEnvFile } from "./configs"

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: applyEnvFile(),
        }),
    ],
})
export class GlobalNestModule {}
