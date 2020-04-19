import { Model } from "mongoose"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { USERS_COLLECTION } from "../../types"
import { UserDocument, UserCreationDto } from "../../schemas"

@Injectable()
export class UserDatabaseCreation {
    constructor(
        @InjectModel(USERS_COLLECTION) private userModel: Model<UserDocument>,
    ) {}

    public async createUser(user: UserCreationDto): Promise<UserDocument> {
        const savedToken = new this.userModel(user)
        return await savedToken.save()
    }
}
