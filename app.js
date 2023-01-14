import express from 'express'
import mongoose from 'mongoose'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import logger from './utils/logger.js'
import errorHandlerMiddleware from './middleware/error.middleware.js'
import notFoundMiddleware from './middleware/not-found.middleware.js'

class App {
    constructor(routes, port) {
        this.express = express()
        this.port = port

        this.initializeDatabaseConnection()
        this.initializeMiddleware()
        this.initializeControllers(routes)
        this.initializeNotFound()
        this.initializeErrorHandling()
    }

    initializeMiddleware() {
        this.express.use(helmet())
        this.express.use(cors())
        this.express.use(morgan('dev'))
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: false }))
        this.express.use(compression())
    }

    initializeControllers(routes) {
        routes.forEach((router) => {
            this.express.use('/api', router)
        })
    }

    initializeNotFound() {
        this.express.use(notFoundMiddleware)
    }

    initializeErrorHandling() {
        this.express.use(errorHandlerMiddleware)
    }

    initializeDatabaseConnection() {
        const mongoUri = process.env.MONGO_URI

        mongoose.set('strictQuery', false)
        mongoose.connect(mongoUri)
            .then(() => {
                logger.info("Database connection is ready")
            })
            .catch((error) => {
                logger.error(error.message)
            })
    }

    listen() {
        this.express.listen(this.port, () => {
            logger.info(`App running on http://localhost:${this.port}`)
        })
    }
}

export default App