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

    async isTokenAvailable(refreshToken: string, userId: string): Promise<boolean> {
        const token = await this.findTokenByUserId(refreshToken, userId)
        return token.isAvailable
    }

    async isTokenExist(email: string): Promise<boolean> {
        const token = await this.findTokenByEmail(email)
        return !!token
    }

    private async findTokensByUserId(userId: string): Promise<RefreshTokenDocument[]> {
        return await this.tokenRefreshModel.find({ userId }).exec()
    }

    private async findTokenByUserId(refreshToken: string, userId: string): Promise<RefreshTokenDocument> {
        return await this.tokenRefreshModel.findOne({ userId, refresh_token: refreshToken }).exec()
    }

    private async findTokenByEmail(email: string): Promise<RefreshTokenDocument> {
        return await this.tokenRefreshModel.findOne({ email }).exec()
    }
}
