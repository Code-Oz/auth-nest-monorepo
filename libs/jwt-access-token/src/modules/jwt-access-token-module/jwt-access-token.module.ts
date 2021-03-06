import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"

import { getVariableEnvironment, GlobalNestModule } from "@lib/global-nest"
import { RolesModule } from "@libs/roles"

import { JwtAccessTokenProvider } from "./providers/jwt-access-token.provider"
import { JwtAccessTokenStrategy } from "./providers/jwt-access-token.strategy"
import { JwtAccessTokenAuthGuard } from "./guards/jwt-access-token.guard"

@Module({
  imports: [
    GlobalNestModule,
    RolesModule,
    JwtModule.register({
      secret: getVariableEnvironment("JWT_ACCESS_TOKEN_SECRET"),
      signOptions: { expiresIn: getVariableEnvironment("JWT_ACCESS_TOKEN_EXPIRE_IN") },
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
