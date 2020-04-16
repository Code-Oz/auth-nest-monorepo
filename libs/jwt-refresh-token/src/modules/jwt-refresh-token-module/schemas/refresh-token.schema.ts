import { Schema, Document } from "mongoose"
import { IsEmail, IsNotEmpty } from "class-validator"

export const RefreshTokenSchema = new Schema({
  _id: String,
  email: String,
  userId: String,
  refresh_token: String,
  isAvailable: Boolean,
}, { versionKey: false })

export interface RefreshTokenDocument extends Document {
    email: string
    userId: string
    refresh_token: string
    isAvailable: boolean
}

export class RefreshTokenCreationDto {
    @IsNotEmpty()
    _id: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    refresh_token: string

    isAvailable: boolean
}
