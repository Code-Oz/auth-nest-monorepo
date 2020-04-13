import { Schema, Document } from "mongoose"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export const UserSchema = new Schema({
  email: String,
  password: String,
}, { versionKey: false })

export interface UserDocument extends Document {
  email: string
  password: string
}

export class UserCreationDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  password: string

}
