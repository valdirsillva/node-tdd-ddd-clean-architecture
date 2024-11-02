import MockDate from 'mockdate'
import { SaveSurveyResultRepository, SaveSurveyResultModel, SurveyResultModel } from './db-save-survey-result-protocols'
import { DbSaveSurveyResult } from './db-save-survey-result'

const makeFakeSurveyResult = (): SurveyResultModel => ({
    id: 'any_id',
    accountId: 'any_account_id',
    surveyId: 'any_survey_id',
    answer: 'any_answer',
    date: new Date()
})

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
    accountId: 'any_account_id',
    surveyId: 'any_survey_id',
    answer: 'any_answer',
    date: new Date()
})

type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
            return new Promise(resolve => resolve(makeFakeSurveyResult()))
        }
    }
    return new SaveSurveyResultRepositoryStub()
}

const makeSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
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
        const surveyResultData = makeFakeSurveyResultData()
        await sut.save(surveyResultData)
        expect(addSpy).toHaveBeenCalledWith(surveyResultData)
    })

    test('Should throw if SaveSurveyResultRepository throws', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut()
        jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())
            ))
        const promise = sut.save(makeFakeSurveyResultData())
        await expect(promise).rejects.toThrow()
    })

     
    test('Should return SurveyResult on success', async () => {
        const { sut } = makeSut()
        const surveyResult = await sut.save(makeFakeSurveyResult())
        expect(surveyResult).toEqual(makeFakeSurveyResult())
    })
})