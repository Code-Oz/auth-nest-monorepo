import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { UserDocument } from "../schemas/user.schema"
import { USERS_COLLECTION } from "../types/collection.types"

@Injectable()
export class UserService {
    constructor(@InjectModel(USERS_COLLECTION) private userModel: Model<UserDocument>) {}

    async create(user: UserDocument): Promise<void> {
      const createdUser = new this.userModel(user)
      await createdUser.save()
    }

    async isExistUser(email: string): Promise<boolean> {
        const user = await this.findUserByEmail(email)
        return !!user
    }

    private async findUserByEmail(email: string): Promise<UserDocument> {
        return await this.userModel.findOne({ email }).exec()
    }
}
