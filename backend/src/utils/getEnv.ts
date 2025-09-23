import { cleanEnv, port } from "envalid";
import dotenv from "dotenv"

dotenv.config( {quiet: true })

function getEnv() {
    return cleanEnv(process.env, {
        PORT: port({ default: 3000 }),
        DEFAULT_LANGUAGE: str({ default: 'pt-BR' }),
        SESSION_SECRET: str()
    })
}

export default getEnv