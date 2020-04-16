import * as rateLimit from "express-rate-limit"
import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule } from "@nestjs/swagger"

import { getVariableEnvironment } from "@lib/global-nest"

import { AuthModule } from "./modules/auth-module/auth.module"
import { documentBuilderForSwagger } from "./modules/auth-module/swagger/document-builder/main"

async function bootstrap() {
    const app = await NestFactory.create(AuthModule)
    app.useGlobalPipes(new ValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        whitelist: true,
        validationError: {
            target: false,
        },
    }))
    app.use(
        rateLimit({
            windowMs: getVariableEnvironment("RATE_LIMIT_WINDOW_MS"),
            max: getVariableEnvironment("RATE_LIMIT_MAX"),
        }),
    )

    const document = documentBuilderForSwagger(app)
    SwaggerModule.setup("api", app, document)

    await app.listen(3000)
}
bootstrap()
