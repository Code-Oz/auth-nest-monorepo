import { NestFactory } from "@nestjs/core"
import { AuthModule } from "./modules/auth-module/auth.module"
import { ValidationPipe } from "@nestjs/common"

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
  await app.listen(3000)
}
bootstrap()
