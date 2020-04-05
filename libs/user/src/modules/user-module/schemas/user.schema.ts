import { Schema, Document } from "mongoose"

export const UserSchema = new Schema({
  email: String,
  password: String,
})

export interface UserDocument extends Document {
  email: string
  password: string
}
