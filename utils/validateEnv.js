import { cleanEnv, str, port } from "envalid";

function validateEnv() {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        MONGO_URI: str(),
        PORT: port({ default: 8888 })
    })
}

export default validateEnv