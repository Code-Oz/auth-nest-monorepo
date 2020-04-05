import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class JwtAccessTokenProvider {
    constructor(
        private jwtService: JwtService,
    ) {}

    // TODO: Type params
    async provideAccessToken(payload: object) {
        return {
          access_token: this.jwtService.sign(payload),
        }
    }
}
