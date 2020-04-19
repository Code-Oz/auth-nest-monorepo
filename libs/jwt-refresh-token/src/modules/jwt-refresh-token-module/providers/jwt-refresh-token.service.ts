import { Injectable } from "@nestjs/common"

import { RefreshTokenDocument, RefreshTokenCreationDto } from "../schemas/refresh-token.schema"

import { JwtRefreshTokenDatabaseCreation, JwtRefreshTokenDatabaseFind, JwtRefreshTokenDatabaseUpdate } from "./database-layers"

@Injectable()
export class JwtRefreshTokenService {
    constructor(
        private jwtRefreshTokenDatabaseCreation: JwtRefreshTokenDatabaseCreation,
        private jwtRefreshTokenDatabaseFind: JwtRefreshTokenDatabaseFind,
        private jwtRefreshTokenDatabaseUpdate: JwtRefreshTokenDatabaseUpdate,
    ) {}

    public async saveToken(refreshToken: RefreshTokenCreationDto): Promise<RefreshTokenDocument> {
        return await this.jwtRefreshTokenDatabaseCreation.createToken(refreshToken)
    }

    public async isTokenAvailable(refreshTokenId: string): Promise<boolean> {
        const token = await this.jwtRefreshTokenDatabaseFind.findTokenByTokenId(refreshTokenId)
        return !!token && token.isAvailable
    }

    public async isTokenExist(email: string): Promise<boolean> {
        const token = await this.jwtRefreshTokenDatabaseFind.findTokenByEmail(email)
        return !!token
    }

    // Thanks to this, you have only one connection by user at the same time
    public async makeSingletonConnection(email: string): Promise<void> {
        await this.jwtRefreshTokenDatabaseUpdate.updateManyByEmail(email, { isAvailable: false })
    }

    public async changeStatusToken(email: string, refreshTokenId: string): Promise<void> {
        await this.jwtRefreshTokenDatabaseUpdate.updateOneByEmailAndRefreshTokenId(email, refreshTokenId, { isAvailable: false })
    }

}
