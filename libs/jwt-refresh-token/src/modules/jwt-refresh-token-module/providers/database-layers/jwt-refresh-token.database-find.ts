import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { REFRESH_TOKEN_COLLECTION } from "../../types"
import { RefreshTokenDocument } from "../../schemas"

@Injectable()
export class JwtRefreshTokenDatabaseFind {
    constructor(
        @InjectModel(REFRESH_TOKEN_COLLECTION) private tokenRefreshModel: Model<RefreshTokenDocument>,
    ) {}

    public async findTokenByTokenId(refreshTokenId: string): Promise<RefreshTokenDocument> {
        return await this.tokenRefreshModel.findOne({ _id: refreshTokenId }).exec()
    }

    public async findTokenByEmail(email: string): Promise<RefreshTokenDocument> {
        return await this.tokenRefreshModel.findOne({ email }).exec()
    }
}
