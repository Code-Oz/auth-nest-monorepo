import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PasswordTokenPayload } from "../types"

import { JwtTokenDecoding } from "@app/lib-global-nest/tokens/jwt-token-decoding-abstract.class"

@Injectable()
export class JwtPasswordTokenProvider extends JwtTokenDecoding<PasswordTokenPayload>{
    constructor(
        jwtService: JwtService,
    ) {
        super(jwtService)
    }

    async providePasswordToken(payload: PasswordTokenPayload) {
        return {
          password_token: this.jwtService.sign(payload),
        }
    }

    public isValidPayloadToken(payload: string | { [key: string]: any }): payload is PasswordTokenPayload {
        if (!payload || typeof payload === "string") {
            return false
        }
        return !!payload.userEmail
    }
}
