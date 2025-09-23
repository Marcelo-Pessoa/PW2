import express from "express"
import getEnv from "./utils/getEnv"
import router from "./router/router"

const env = getEnv()
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api", router)

app.listen(env.PORT, 'localhost', () => {
  console.log(`App running on localhost:${env.PORT}.`)
})