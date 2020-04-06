import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AccessTokenPayload } from "../types/access-token.payload"

@Injectable()
export class JwtAccessTokenProvider {
    constructor(
        private jwtService: JwtService,
    ) {}

    async provideAccessToken(payload: AccessTokenPayload) {
        return {
          access_token: this.jwtService.sign(payload),
        }
    }
}
