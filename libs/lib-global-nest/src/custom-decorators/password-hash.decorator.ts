import * as bcrypt from "bcrypt"
import { createParamDecorator } from "@nestjs/common"

const saltRounds = 10

export const HashPassword = createParamDecorator(async (field, req) => {
    const { body } = req
    if (!body[field]) {
        console.error(`The field: ${field} is not existing from body for @HashPassword`)
        return undefined
    }
    const hashedPassword = await bcrypt.hash(body[field], saltRounds)
    return {
        [field]: hashedPassword,
    }
})
