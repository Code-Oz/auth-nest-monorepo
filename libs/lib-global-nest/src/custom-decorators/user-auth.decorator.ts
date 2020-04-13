import { createParamDecorator } from "@nestjs/common"

// Allow to get header jwt token decoded informations without using decode function !
export const AuthUser = createParamDecorator((data, req) => {
    return req.user
})
