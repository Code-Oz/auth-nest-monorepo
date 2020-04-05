import { Module } from "@nestjs/common"
import { JwtAccessTokenProvider } from "./providers/jwt-access-token.provider"

@Module({
  providers: [ JwtAccessTokenProvider ],
  exports: [ JwtAccessTokenProvider ],
})
export class JwtAccessTokenModule {}
