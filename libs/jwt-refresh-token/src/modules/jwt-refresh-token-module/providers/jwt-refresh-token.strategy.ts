import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

import { getVariableEnvironment } from "@lib/global-nest"

import { RefreshTokenPayload } from "../types"

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "refresh-token") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: getVariableEnvironment("JWT_REFRESH_TOKEN_SECRET"),
        })
    }

    public async validate(payload: RefreshTokenPayload) {
        return payload
    }
}
