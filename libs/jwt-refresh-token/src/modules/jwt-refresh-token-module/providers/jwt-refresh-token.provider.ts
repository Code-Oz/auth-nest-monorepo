import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class JwtRefreshTokenProvider {
    constructor(
        private jwtService: JwtService,
    ) {}

    // TODO: Type params
    async provideRefreshToken(payload: object) {
        return {
          refresh_token: this.jwtService.sign(payload),
        }
    }
}
