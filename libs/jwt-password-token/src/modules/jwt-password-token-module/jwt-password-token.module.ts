import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"

import { JwtPasswordTokenProvider } from "./providers/jwt-password-token.provider"
import { JwtPasswordTokenStrategy } from "./providers"
import { JwtPasswordTokenAuthGuard } from "./guards/jwt-password-token.guard"

@Module({
  imports: [
    JwtModule.register({
      secret: "fake-password-token",
      signOptions: { expiresIn: "600s" },
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
