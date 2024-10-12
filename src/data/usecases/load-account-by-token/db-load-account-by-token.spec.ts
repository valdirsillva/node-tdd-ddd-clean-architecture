import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@gmail.com',
    password: 'hashed_password'
})

const makeDecrypter = (): Decrypter => {
    class DecrypterStub implements Decrypter {
        async decrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('any_token'))
        }
    }
    return new DecrypterStub()
}

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
        async loadByToken(token: string, role?: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()))
        }
    }
    return new LoadAccountByTokenRepositoryStub()
}

interface SutTypes {
    sut: DbLoadAccountByToken
    descrypterStub: Decrypter
    loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
    const descrypterStub = makeDecrypter()
    const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
    const sut = new DbLoadAccountByToken(descrypterStub, loadAccountByTokenRepositoryStub)
    return {
        sut,
        descrypterStub,
        loadAccountByTokenRepositoryStub
    }
}

describe('DbLoadAccountByToken Usecase', () => {
    test('Should call Decrypter with correct values', async () => {
        const { sut, descrypterStub } = makeSut()
        const decryptSpy = jest.spyOn(descrypterStub, 'decrypt')
        await sut.load('any_token', 'any_role')
        expect(decryptSpy).toHaveBeenCalledWith('any_token')
    })

    test('Should return null if decrypter returns null', async () => {
        const { sut, descrypterStub } = makeSut()
        jest.spyOn(descrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const account = await sut.load('any_token', 'any_role')
        expect(account).toBeNull()
    })

    test('Should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()
        const decryptLoadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
        await sut.load('any_token', 'any_role')
        expect(decryptLoadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
    })

    test('Should return null if LoadAccountByTokenRepository returns null', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const account = await sut.load('any_token', 'any_role')
        expect(account).toBeNull()
    })

    test('Should return an account on success', async () => {
        const { sut } = makeSut()
        const account = await sut.load('any_token', 'any_role')
        expect(account).toEqual(makeFakeAccount())
    })

    test('Should throw if Decrypter throws', async () => {
        const { sut, descrypterStub } = makeSut()
        jest.spyOn(descrypterStub, 'decrypt').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())
            ))
        const promise = sut.load('any_token', 'any_role')
        await expect(promise).rejects.toThrow()
    })

    test('Should throw if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())
            ))
        const promise = sut.load('any_token', 'any_role')
        await expect(promise).rejects.toThrow()
    })
})