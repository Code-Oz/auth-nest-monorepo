import * as request from "supertest"
const { MongoClient } = require("mongodb")
import { Test } from "@nestjs/testing"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { AuthModule } from "../../auth.module"

describe("AuthController E2E: PostRegister", () => {
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
  })

  test(`/POST register: User register`, async (done) => {
    const fakeUserBody = {
        email: "toto@toto.fr",
        password: "tototo",
    }

    await request(app.getHttpServer())
      .post("/register")
      .send(fakeUserBody)
      .expect({
          message: "User has been registered !",
        })
      .expect(201)

    done()
  })
  test(`/POST register: User already exist`, async (done) => {
    const fakeUserBody = {
        email: "toto@toto.fr",
        password: "tototo",
    }

    const requestResponse = await request(app.getHttpServer())
      .post("/register")
      .send(fakeUserBody)
      .expect(409)

    expect(requestResponse.body).toMatchObject({
        statusCode: 409,
        path: "/register",
        method: "POST",
        error: "User already register",
        timestamp: expect.any(String),
    })

    done()
  })
  test(`/POST register: Class validation failed`, async (done) => {
    const fakeUserBodyWithoutPassword = {
        email: "toto@toto.fr",
    }

    const requestResponse = await request(app.getHttpServer())
      .post("/register")
      .send(fakeUserBodyWithoutPassword)
      .expect(400)

    expect(requestResponse.body).toMatchObject({
        statusCode: 400,
        path: "/register",
        method: "POST",
        errors: {
          password: {
              errors: [
                  "password must be longer than or equal to 6 characters",
                  "password should not be empty",
              ],
          },
      },
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
