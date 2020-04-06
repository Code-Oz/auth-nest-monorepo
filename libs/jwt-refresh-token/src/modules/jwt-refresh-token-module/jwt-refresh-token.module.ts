import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"

import { JwtRefreshTokenProvider } from "./providers/jwt-refresh-token.provider"
import { JwtRefreshTokenStrategy } from "./providers/jwt-refresh-token.strategy"
import { JwtRefreshTokenAuthGuard } from "./guards/jwt-access-token.guard"

@Module({
  imports: [
    JwtModule.register({
      secret: "fake-refresh-token",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [
    JwtRefreshTokenProvider,
    JwtRefreshTokenStrategy,
    JwtRefreshTokenAuthGuard,
  ],
  exports: [
    JwtRefreshTokenProvider,
    JwtRefreshTokenStrategy,
    JwtRefreshTokenAuthGuard,
  ],
})
export class JwtRefreshTokenModule {}
