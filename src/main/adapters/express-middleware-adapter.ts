import { HttpRequest, Middleware } from "../../presentation/http";
import { NextFunction, Request, Response } from 'express'

/**
 * Design pattners Proxy
 * @param middleware 
 * @returns 
 */
export const adapterMiddleware = (middleware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: HttpRequest = {
            headers: req.headers
        }
        const httpResponse = await middleware.handle(httpRequest)
        if (httpResponse.statusCode === 200) {
            Object.assign(req, httpResponse.body)
            next()
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            })
        }
    }
}