import { Schema, Document } from "mongoose"
import { IsEmail, IsNotEmpty } from "class-validator"

export const UserSchema = new Schema({
  email: String,
  password: String,
})

export interface UserDocument extends Document {
  email: string
  password: string
}

export class UserCreationDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string

}
