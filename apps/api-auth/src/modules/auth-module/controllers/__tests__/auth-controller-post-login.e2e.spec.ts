import * as request from "supertest"
const { MongoClient } = require("mongodb")
import { Test } from "@nestjs/testing"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { AuthModule } from "../../auth.module"

describe("AuthController E2E: PostLogin", () => {
  let connection
  let db
  let app: INestApplication

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

  test(`/POST login: User logged`, async (done) => {
    const fakeUserBody = {
        email: "toto@toto.fr",
        password: "tototo",
    }

    const loginResponse = await request(app.getHttpServer())
      .post("/login")
      .send(fakeUserBody)
      .expect(201)

    expect(loginResponse.body).toMatchObject({
      access_token: expect.any(String),
      refresh_token: expect.any(String),
    })

    done()
  })
  test(`/POST login: Check singleton connection`, async (done) => {
    // Drop collection refresh-tokens in order to have fresh collection
    await db.collection("refresh-tokens").deleteMany({})

    const fakeUserBody = {
        email: "toto@toto.fr",
        password: "tototo",
    }

    const loginResponse1 = await request(app.getHttpServer())
      .post("/login")
      .send(fakeUserBody)
      .expect(201)
    const loginResponse2 = await request(app.getHttpServer())
      .post("/login")
      .send(fakeUserBody)
      .expect(201)
    const loginResponse3 = await request(app.getHttpServer())
      .post("/login")
      .send(fakeUserBody)
      .expect(201)

    // Check singleton connection
    const tokens = await db.collection("refresh-tokens").find({ email: fakeUserBody.email }).toArray()
    expect(tokens.length).toEqual(3)
    const firstToken = tokens.find(token => token.refresh_token === loginResponse1.body.refresh_token)
    const secondToken = tokens.find(token => token.refresh_token === loginResponse2.body.refresh_token)
    const thirdToken = tokens.find(token => token.refresh_token === loginResponse3.body.refresh_token)

    expect(firstToken).toMatchObject({
      isAvailable: false,
      email: fakeUserBody.email,
    })
    expect(secondToken).toMatchObject({
      isAvailable: false,
      email: fakeUserBody.email,
    })
    expect(thirdToken).toMatchObject({
      isAvailable: true,
      email: fakeUserBody.email,
    })

    done()
  })
  test(`/POST login: Validation failed`, async (done) => {
    const fakeUserBody = {
        email: "toto@toto.fr",
    }

    const loginResponse = await request(app.getHttpServer())
      .post("/login")
      .send(fakeUserBody)
      .expect(400)

    expect(loginResponse.body).toMatchObject({
        statusCode: 400,
        path: "/login",
        method: "POST",
        errors: {
          password: {
              errors: [
                  "password should not be empty",
              ],
          },
      },
        timestamp: expect.any(String),
    })

    done()
  })
  test(`/POST login: Class validation failed`, async (done) => {
    const fakeUserBodyWithWrongPassword = {
        email: "toto@toto.fr",
        password: "tititi",
    }

    const requestResponse = await request(app.getHttpServer())
      .post("/login")
      .send(fakeUserBodyWithWrongPassword)
      .expect(403)

    expect(requestResponse.body).toMatchObject({
        statusCode: 403,
        path: "/login",
        method: "POST",
        error: "Wrong credential",
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
