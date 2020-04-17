import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PasswordTokenPayload } from "../types"

@Injectable()
export class JwtPasswordTokenProvider {
    constructor(
        private jwtService: JwtService,
    ) {}

    public async providePasswordToken(payload: PasswordTokenPayload) {
        return {
            password_token: this.jwtService.sign(payload),
        }
    }
}
