import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import setupMiddlewares from './middlewares'
import setupSwagger from './config-swagger'
import express from 'express'

const app = express()
setupStaticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app