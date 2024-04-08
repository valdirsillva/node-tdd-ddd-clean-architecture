import { Controller, HttpRequest } from "../../presentation/http";
import { Request, Response } from 'express'

export const adapterRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body
        }
        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpRequest.body)
    }
}