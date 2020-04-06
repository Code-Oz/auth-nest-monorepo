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

    async isTokenAvailable(userId: string): Promise<boolean> {
        const token = await this.findTokenByUserId(userId)
        return token.isAvailable
    }

    async isTokenExist(email: string): Promise<boolean> {
        const token = await this.findTokenByEmail(email)
        return !!token
    }

    private async findTokenByUserId(userId: string): Promise<RefreshTokenDocument> {
        return await this.tokenRefreshModel.findOne({ userId }).exec()
    }

    private async findTokenByEmail(email: string): Promise<RefreshTokenDocument> {
        return await this.tokenRefreshModel.findOne({ email }).exec()
    }
}
