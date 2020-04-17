import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

import { getVariableEnvironment } from "@lib/global-nest"

import { PasswordTokenPayload } from "../types"

@Injectable()
export class JwtPasswordTokenStrategy extends PassportStrategy(Strategy, "password-token") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: getVariableEnvironment("JWT_PASSWORD_TOKEN_SECRET"),
        })
    }

    public async validate(payload: PasswordTokenPayload) {
        return payload
    }
}
