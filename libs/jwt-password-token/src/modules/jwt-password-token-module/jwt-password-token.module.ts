import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule } from "@nestjs/config"

import { getVariableEnvironment } from "@app/lib-global-nest"

import { JwtPasswordTokenProvider } from "./providers/jwt-password-token.provider"
import { JwtPasswordTokenStrategy } from "./providers"
import { JwtPasswordTokenAuthGuard } from "./guards/jwt-password-token.guard"

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    JwtPasswordTokenStrategy,
    JwtPasswordTokenAuthGuard,
  ],
})
export class JwtPasswordTokenModule {}
