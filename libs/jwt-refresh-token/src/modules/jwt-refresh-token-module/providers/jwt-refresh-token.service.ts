import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { REFRESH_TOKEN_COLLECTION } from "../types/refresh-collections.types"
import { RefreshTokenDocument, RefreshTokenCreationDto } from "../schemas/refresh-token.schema"

@Injectable()
export class JwtRefreshTokenService {
    constructor(
        @InjectModel(REFRESH_TOKEN_COLLECTION) private tokenRefreshModel: Model<RefreshTokenDocument>,
    ) {}

    async saveToken(refreshToken: RefreshTokenCreationDto): Promise<RefreshTokenDocument> {
        const savedToken = new this.tokenRefreshModel(refreshToken)
        return await savedToken.save()
    }

    async isTokenAvailable(refreshTokenId: string): Promise<boolean> {
        const token = await this.findTokenByTokenId(refreshTokenId)
        return !!token && token.isAvailable
    }

    async isTokenExist(email: string): Promise<boolean> {
        const token = await this.findTokenByEmail(email)
        return !!token
    }

    // Thanks to this, you have only one connection by user at the same time
    async makeSingletonConnection(email: string): Promise<void> {
        await this.tokenRefreshModel.updateMany({ email }, { $set: { isAvailable: false } }).exec()
    }

    async changeStatusToken(email: string, refreshTokenId: string): Promise<void> {
        await this.tokenRefreshModel.updateOne({ email, _id: refreshTokenId }, { $set: { isAvailable: false } }).exec()
    }

    private async findTokenByTokenId(refreshTokenId: string): Promise<RefreshTokenDocument> {
        return await this.tokenRefreshModel.findOne({ _id: refreshTokenId }).exec()
    }

    private async findTokenByEmail(email: string): Promise<RefreshTokenDocument> {
        return await this.tokenRefreshModel.findOne({ email }).exec()
    }
}
