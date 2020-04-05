import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { JwtAccessTokenProvider } from "./providers/jwt-access-token.provider"
import { JwtAccessTokenStrategy } from "./providers/jwt-access-token.strategy"
import { JwtAccessTokenAuthGuard } from "./guards/jwt-access-token.guard"

@Module({
  imports: [
    JwtModule.register({
      secret: "fake-access-token",
      signOptions: { expiresIn: "600s" },
    }),
  ],
  providers: [
    JwtAccessTokenProvider,
    JwtAccessTokenStrategy,
    JwtAccessTokenAuthGuard,
  ],
  exports: [
    JwtAccessTokenProvider,
    JwtAccessTokenAuthGuard,
  ],
})
export class JwtAccessTokenModule {}
