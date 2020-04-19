import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { MongoUpdateOperationAbstract } from "@lib/global-nest/database/mongo-update-operation.abstract-class"

import { USERS_COLLECTION } from "../../types"
import { UserDocument } from "../../schemas"

@Injectable()
export class UserDatabaseUpdate extends MongoUpdateOperationAbstract<
    UserDocument
> {
    constructor(
        @InjectModel(USERS_COLLECTION) private userModel: Model<UserDocument>,
    ) {
        super(userModel)
    }

    public async updateOneByEmail(email: string, objectToUpload: Partial<UserDocument>): Promise<void> {
        await this.updateOne({ email }, objectToUpload)
    }

}
