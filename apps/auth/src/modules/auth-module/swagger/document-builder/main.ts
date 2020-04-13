import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { INestApplication } from "@nestjs/common"

export const documentBuilderForSwagger = (app: INestApplication) => {
    const options = new DocumentBuilder()
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Refresh token given by login",
      },
      "refresh-token",
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Password token for reseting password user",
      },
      "password-token",
    )
    .setTitle("NestJs Authentification with refresh/access token pattern")
    .setDescription("Basic api nest for authentification with email/password login, support reset password by email")
    .setVersion("1.0")
    .build()

    const document = SwaggerModule.createDocument(app, options)
    return document
}
