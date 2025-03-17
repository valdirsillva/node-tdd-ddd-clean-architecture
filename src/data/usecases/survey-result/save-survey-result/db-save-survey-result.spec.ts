import MockDate from 'mockdate'
import { SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { mockSurveyModelResult, mockSaveSurveyResultParams } from '@/domain/test'
import { mockSaveSurveyResultRepository } from '@/data/test/mock-db-survey-result'

type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
    return {
        sut,
        saveSurveyResultRepositoryStub
    }
}

describe('DbSaveSurveyResult Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call SaveSurveyResultRepository with correct values', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
        const surveyResultData = mockSaveSurveyResultParams()
        await sut.save(surveyResultData)
        expect(addSpy).toHaveBeenCalledWith(surveyResultData)
    })

    test('Should throw if SaveSurveyResultRepository throws', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut()
        jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())
            ))
        const promise = sut.save(mockSaveSurveyResultParams())
        await expect(promise).rejects.toThrow()
    })

     
    test('Should return SurveyResult on success', async () => {
        const { sut } = makeSut()
        const surveyResult = await sut.save(mockSaveSurveyResultParams())
        expect(surveyResult).toEqual(mockSurveyModelResult())
    })
})