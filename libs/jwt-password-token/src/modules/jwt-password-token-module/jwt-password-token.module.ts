import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"

import { getVariableEnvironment, GlobalNestModule } from "@lib/global-nest"

import { JwtPasswordTokenProvider } from "./providers/jwt-password-token.provider"
import { JwtPasswordTokenStrategy } from "./providers"
import { JwtPasswordTokenAuthGuard } from "./guards/jwt-password-token.guard"

@Module({
    imports: [
        GlobalNestModule,
        JwtModule.register({
            secret: getVariableEnvironment("JWT_PASSWORD_TOKEN_SECRET"),
            signOptions: { expiresIn: getVariableEnvironment("JWT_PASSWORD_TOKEN_EXPIRE_IN") },
        }),
    ],
    providers: [
        JwtPasswordTokenProvider,
        JwtPasswordTokenStrategy,
        JwtPasswordTokenAuthGuard,
    ],
    exports: [
        JwtPasswordTokenProvider,
        JwtPasswordTokenAuthGuard,
    ],
})
export class JwtPasswordTokenModule {}
