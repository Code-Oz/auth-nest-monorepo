import { Module } from "@nestjs/common"
import { JwtRefreshTokenProvider } from "./providers/jwt-refresh-token.provider"

@Module({
  providers: [ JwtRefreshTokenProvider ],
  exports: [ JwtRefreshTokenProvider ],
})
export class JwtRefreshTokenModule {}
