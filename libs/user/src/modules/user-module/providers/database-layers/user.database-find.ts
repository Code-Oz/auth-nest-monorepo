import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { USERS_COLLECTION } from "../../types"
import { UserDocument } from "../../schemas"

@Injectable()
export class UserDatabaseFind {
    constructor(
        @InjectModel(USERS_COLLECTION) private userModel: Model<UserDocument>,
    ) {}

    public async findUserByEmail(email: string): Promise<UserDocument> {
        return await this.userModel.findOne({ email }).exec()
    }
}
