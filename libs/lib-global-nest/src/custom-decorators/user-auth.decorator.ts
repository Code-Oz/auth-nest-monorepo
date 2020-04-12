import { createParamDecorator } from "@nestjs/common"

// Allow to get header jwt token decoded informations
export const AuthUser = createParamDecorator((data, req) => {
    return req.user
})
