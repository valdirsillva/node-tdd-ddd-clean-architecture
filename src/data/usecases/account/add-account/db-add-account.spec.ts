import { DbAddAccount } from './db-add-account'
import { Hasher, AddAccountRepository, AccountModel, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { mockAccountModel, mockAddAccountParams, throwError  } from '@/domain/test'
import { mockAddAccoutRepository, mockHasher } from '@/data/test'

type SutTypes = {
    sut: DbAddAccount
    HasherStub: Hasher,
    addAccountRepositoryStub: AddAccountRepository
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
    const HasherStub = mockHasher()
    const loadAccountByEmailRepositoryStub = makeLoadAccounbtByEmailRepository()
    const addAccountRepositoryStub = mockAddAccoutRepository()
    const sut = new DbAddAccount(HasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
    return {
        sut,
        HasherStub,
        addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub
    }
}

const makeLoadAccounbtByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail(email: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(null!))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

describe('DbAddAccount UseCase', () => {
    test('Should call Hasher with correct password', async () => {
        const { sut, HasherStub } = makeSut()
        const hashSpy = jest.spyOn(HasherStub, 'hash')
        await sut.add(mockAddAccountParams())
        expect(hashSpy).toHaveBeenCalledWith('any_password')
    })

    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, HasherStub } = makeSut()
        jest.spyOn(HasherStub, 'hash').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())
            ))
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(mockAddAccountParams())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@gmail.com',
            password: 'any_password'
        })
    })

    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on success', async () => {
        const { sut } = makeSut()
        const account = await sut.add(mockAddAccountParams())
        expect(account).toEqual(mockAccountModel())
    })

    test('Should return null if LoadAccountByEmailRepository not returns null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(
            new Promise(resolve => resolve(mockAccountModel()))
        )
        const account = await sut.add(mockAddAccountParams())
        expect(account).toBeNull()
    })

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
        await sut.add(mockAddAccountParams())
        expect(loadSpy).toHaveBeenCalledWith('any_email@gmail.com')
    })
})