import * as request from "supertest"
const { MongoClient } = require("mongodb")
import { Test } from "@nestjs/testing"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { AuthModule } from "../../auth.module"

describe("AuthController E2E: PostLogout", () => {
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

  test(`/POST login: User logout`, async (done) => {
    const fakeUserBody = {
        email: "toto@toto.fr",
        password: "tototo",
    }

    await request(app.getHttpServer())
      .post("/logout")
      .set("Authorization", `Bearer ${refreshToken}`)
      .send(fakeUserBody)
      .expect(201)
      .expect({
        message: "User successfully logout",
      })

    const availableTokenUser = await db.collection("refresh-tokens").find({ isAvailable: true }).toArray()

    expect(availableTokenUser.length).toEqual(0)

    done()
  })

  test(`/POST login: Unauthorize`, async (done) => {
    const fakeUserBody = {
        email: "toto@toto.fr",
        password: "tototo",
    }

    const requestResponse = await request(app.getHttpServer())
      .post("/logout")
      .send(fakeUserBody)
      .expect(401)

    expect(requestResponse.body).toMatchObject({
      statusCode: 401,
      path: "/logout",
      method: "POST",
      error: "Unauthorized",
      timestamp: expect.any(String),
    })

    done()
  })

  test(`/POST login: Token is not available in db`, async (done) => {
    const fakeUserBody = {
        email: "toto@toto.fr",
        password: "tototo",
    }

    // Mock token is unAvailable in db
    await db.collection("refresh-tokens").updateMany({ email: fakeUserBody.email }, { $set: { isAvailable: false } })

    const requestResponse = await request(app.getHttpServer())
      .post("/logout")
      .set("Authorization", `Bearer ${refreshToken}`)
      .send(fakeUserBody)
      .expect(403)

    expect(requestResponse.body).toMatchObject({
      statusCode: 403,
      path: "/logout",
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
