import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"
import getEnv from "./utils/getEnv"
import router from "./router/router"
import createLangCookie from "./middlewares/createLangCookie"
import { PrismaClient } from "./generated/prisma"

declare module "express-session" {
  interface SessionData {
    userType: number;
    userData: string;
  }
}

const env = getEnv()
const app = express()
const prisma = new PrismaClient()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(createLangCookie)
app.use(session({
  secret: env.SESSION_SECRET,
  resave: true,
  rolling: true,
  store: new PrismaSessionStore(Prisma, {
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