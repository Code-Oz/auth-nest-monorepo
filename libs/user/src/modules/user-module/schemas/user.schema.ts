import { Schema, Document } from "mongoose"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { USER_ROLES } from "@libs/roles/modules/types"

export const UserSchema = new Schema({
    email: String,
    password: String,
    roles: [ String ],
}, { versionKey: false })

export interface UserDocument extends Document {
    email: string
    password: string
    roles: USER_ROLES[]
}

export interface UserCreationModel {
    email: string
    password: string
    roles: USER_ROLES[]
}
