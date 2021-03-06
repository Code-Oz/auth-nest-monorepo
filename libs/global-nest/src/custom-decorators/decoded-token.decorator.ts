import { createParamDecorator } from "@nestjs/common"

// Allow to get header jwt token decoded informations without using decode function !
export const DecodedToken = createParamDecorator((_data, req) => {
    return req.user
})
