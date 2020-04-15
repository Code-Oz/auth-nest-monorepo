import * as request from "supertest"
const { MongoClient } = require("mongodb")
import { Test } from "@nestjs/testing"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { AuthModule } from "../../auth.module"

describe("AuthController E2E: PostAccessToken", () => {
  let connection
  let db
  let app: INestApplication
  let refreshToken

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb://localhost/nest-test", {
      useNewUrlParser: true,
    })
    db = await connection.db("nest-test")
    await db.collection("users").deleteMany({})
    await db.collection("refresh-tokens").deleteMany({})

    const moduleRef = await Test.createTestingModule({
      imports: [ AuthModule ],
    })
    .compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        whitelist: true,
        validationError: {
          target: false,
        },
    }))

    await app.init()

    const fakeUserBody = {
        email: "toto@toto.fr",
        password: "tototo",
    }

    // Register user first
    await request(app.getHttpServer())
      .post("/register")
      .send(fakeUserBody)
      .expect({
          message: "User has been registered !",
        })
      .expect(201)

  })

  beforeEach(async () => {
    await db.collection("refresh-tokens").deleteMany({})
    const fakeUserBody = {
      email: "toto@toto.fr",
      password: "tototo",
    }

    const loginResponse = await request(app.getHttpServer())
    .post("/login")
    .send(fakeUserBody)
    .expect(201)

    refreshToken = loginResponse.body.refresh_token
    expect(refreshToken).toBeDefined()
  })

  test(`/POST access_token: Get new access token`, async (done) => {
    const responseRequest = await request(app.getHttpServer())
      .post("/access_token")
      .set("Authorization", `Bearer ${refreshToken}`)
      .expect(201)

    expect(responseRequest.body).toMatchObject({
      access_token: expect.any(String),
    })

    done()
  })

  test(`/POST access_token: Token is not available in db`, async (done) => {
    const fakeUserBody = {
      email: "toto@toto.fr",
      password: "tototo",
    }

    // Mock token is unAvailable in db
    await db.collection("refresh-tokens").updateMany({ email: fakeUserBody.email }, { $set: { isAvailable: false } })

    const responseRequest = await request(app.getHttpServer())
      .post("/access_token")
      .set("Authorization", `Bearer ${refreshToken}`)
      .expect(403)

    expect(responseRequest.body).toMatchObject({
      statusCode: 403,
      path: "/access_token",
      method: "POST",
      error: "Token is not available",
      timestamp: expect.any(String),
    })

    done()
  })

  afterAll(async (done) => {
    await db.collection("users").deleteMany({})
    await db.collection("refresh-tokens").deleteMany({})
    await connection.close()
    await app.close()
    done()
  })
})
