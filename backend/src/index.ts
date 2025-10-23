import express from "express"
import getEnv from "./utils/getEnv"
import router from "./router/router"
import cookieParser from "cookie-parser"
import session from "express-session"
import createLangCookie from "./middlewares/createLangCookie"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";

declare module "express-session" {
  interface SessionData {
    userType: number;
    userId: string;
  }
}

const env = getEnv()
const app = express()
const prisma = new PrismaClient()

//Documentation
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(createLangCookie)
app.use(session({
  genid: (req) => uuidv4() ,
  secret: env.SESSION_SECRET,
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 30 * 60 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
  }),
  cookie: { maxAge: 2 * 60 * 60 * 1000 , httpOnly: true, secure: true}
}))

// Routes
app.use(router)

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`API server running on 0.0.0.0:${env.PORT}`)
})