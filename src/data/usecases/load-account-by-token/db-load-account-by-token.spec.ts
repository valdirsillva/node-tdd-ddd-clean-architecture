import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

interface SutTypes {
    sut: DbLoadAccountByToken
    descrypterStub: Decrypter
}

const makeDecrypter = (): Decrypter => {
    class DecrypterStub implements Decrypter {
        async decrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('any_value'))
        }
    }
    return new DecrypterStub()
}

const makeSut = (): SutTypes => {
    const descrypterStub = makeDecrypter()
    const sut = new DbLoadAccountByToken(descrypterStub)
    return {
        sut,
        descrypterStub
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
})