import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { MongoUpdateOperationAbstract } from "@lib/global-nest/database/mongo-update-operation.abstract-class"

import { REFRESH_TOKEN_COLLECTION } from "../../types"
import { RefreshTokenDocument } from "../../schemas"

@Injectable()
export class JwtRefreshTokenDatabaseUpdate extends MongoUpdateOperationAbstract<
    RefreshTokenDocument
> {
    constructor(
        @InjectModel(REFRESH_TOKEN_COLLECTION) tokenRefreshModel: Model<RefreshTokenDocument>,
    ) {
        super(tokenRefreshModel)
    }

    public async updateManyByEmail(email: string, objectToUpload: Partial<RefreshTokenDocument>): Promise<void> {
        await this.updateMany({ email }, objectToUpload)
    }

    public async updateOneByEmailAndRefreshTokenId(email: string, refreshTokenId: string, objectToUpload: Partial<RefreshTokenDocument>): Promise<void> {
        await this.updateOne({ email, _id: refreshTokenId }, objectToUpload)
    }
}
