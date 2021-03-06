import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

import { getVariableEnvironment } from "@lib/global-nest"

import { AccessTokenPayload } from "../types"

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, "access-token") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: getVariableEnvironment("JWT_ACCESS_TOKEN_SECRET"),
        })
    }

    public async validate(payload: AccessTokenPayload) {
        return payload
    }
}
