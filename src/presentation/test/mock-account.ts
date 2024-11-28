import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel, LoadAccountByToken } from '../middlewares/auth-middleware-protocols'
import { mockAccountModel } from '@/domain/test'

export const mockAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add(account: AddAccountParams): Promise<AccountModel> {
            return new Promise(resolve => resolve(mockAccountModel()))
        }
    }
    return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async auth(authentication: AuthenticationParams): Promise<string> {
            return new Promise(resolve => resolve('any_token'))
        }
    }
    return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
        async load(accessToken: string, role?: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(mockAccountModel()))
        }
    }
    return new LoadAccountByTokenStub()
}
