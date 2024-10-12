import { Middleware } from "@/presentation/http"
import { AuthMiddleware } from "@/presentation/middlewares/auth-middleware"
import {  makeDbLoadAccountByToken } from "../usecases/account/load-account-by-token/db-load-account-by-token-factory"

export const makeAuthMiddleware = (role?: string): Middleware => {
    const makeLoadAccountByToken = makeDbLoadAccountByToken()
    return new AuthMiddleware(makeLoadAccountByToken, role)
}