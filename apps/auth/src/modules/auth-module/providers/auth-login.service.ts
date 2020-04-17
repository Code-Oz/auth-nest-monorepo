import { Types } from "mongoose"

import { Injectable } from "@nestjs/common"

import { UserService, UserCredentialService, UserDocument } from "@lib/user"
import { JwtAccessTokenProvider } from "@lib/jwt-access-token"
import { JwtRefreshTokenProvider, JwtRefreshTokenService } from "@lib/jwt-refresh-token"

import { ProvidersToken } from "../types/providers-token.type"
import { UserConnectionDto } from "../validations/user-connection.dto"
import { UserWrongCredentialException } from "../custom-errors/user-wrong-credential.exception"

@Injectable()
export class AuthLoginService {
    constructor(
        private userService: UserService,
        private userCredentialService: UserCredentialService,
        private jwtAccessTokenProvider: JwtAccessTokenProvider,
        private jwtRefreshTokenProvider: JwtRefreshTokenProvider,
        private jwtRefreshTokenService: JwtRefreshTokenService,
    ) {}

    public async postLogin(userConnectionDto: UserConnectionDto): Promise<ProvidersToken> {
        const { email } = userConnectionDto

        const user = await this.userService.findUserByEmail(email)

        if (!user) {
            throw new UserWrongCredentialException()
        }

        await this.checkingCredential(userConnectionDto, user)

        await this.jwtRefreshTokenService.makeSingletonConnection(email)

        return await this.provideToken(user)
    }

    private async checkingCredential(userConnectionDto: UserConnectionDto, user: UserDocument): Promise<void> {
        const passwordFromRequest = userConnectionDto.password
        const passwordFromDb = user.password
        const isCredentialCorrect = await this.userCredentialService.checkingCredentialPassword(
            passwordFromRequest,
            passwordFromDb,
        )

        if (!isCredentialCorrect) {
            throw new UserWrongCredentialException()
        }
    }

    private async provideToken(user: UserDocument): Promise<ProvidersToken> {
        const refreshTokenId = new Types.ObjectId().toHexString()
        const refreshToken = await this.jwtRefreshTokenProvider.provideRefreshToken({
            userId: user.id,
            userEmail: user.email,
            refreshTokenId,
        })
        const accessToken = await this.jwtAccessTokenProvider.provideAccessToken({
            userId: user.id,
            userEmail: user.email,
        })

        await this.jwtRefreshTokenService.saveToken({
            _id: refreshTokenId,
            email: user.email,
            userId: user.id,
            refresh_token: refreshToken.refresh_token,
            isAvailable: true,
        })

        return {
            refresh_token: refreshToken.refresh_token,
            access_token: accessToken.access_token,
        }
    }
}
