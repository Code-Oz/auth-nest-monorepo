import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"

import { JwtRefreshTokenProvider } from "./providers/jwt-refresh-token.provider"
import { JwtRefreshTokenStrategy } from "./providers/jwt-refresh-token.strategy"
import { JwtRefreshTokenService } from "./providers/jwt-refresh-token.service"
import { JwtRefreshTokenAuthGuard } from "./guards/jwt-access-token.guard"
import { REFRESH_TOKEN_COLLECTION } from "./types/refresh-collections.types"
import { RefreshTokenSchema } from "./schemas/refresh-token.schema"

@Module({
  imports: [
    JwtModule.register({
      secret: "fake-refresh-token",
      signOptions: { expiresIn: "7d" },
    }),
    MongooseModule.forRoot("mongodb://localhost/nest"),
    MongooseModule.forFeature([{ name: REFRESH_TOKEN_COLLECTION, schema: RefreshTokenSchema }]),
  ],
  providers: [
    JwtRefreshTokenProvider,
    JwtRefreshTokenService,
    JwtRefreshTokenStrategy,
    JwtRefreshTokenAuthGuard,
  ],
  exports: [
    JwtRefreshTokenProvider,
    JwtRefreshTokenService,
    JwtRefreshTokenStrategy,
    JwtRefreshTokenAuthGuard,
  ],
})
export class JwtRefreshTokenModule {}
