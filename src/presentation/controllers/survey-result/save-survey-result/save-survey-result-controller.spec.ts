import { forbidden } from '@/presentation/helpers/http/http-helper'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest, LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { mockLoadSurveyById, mockSaveSurveyResult } from '@/presentation/test/mock-survey'

const makeFakeRequest = (): HttpRequest => ({
    params: {
        surveyId: 'any_survey_id'
    }
})

type SutTypes = {
    sut: SaveSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
    saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
    const loadSurveyByIdStub = mockLoadSurveyById()
    const saveSurveyResultStub = mockSaveSurveyResult()
    const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
    return {
        sut,
        loadSurveyByIdStub,
        saveSurveyResultStub
    }
}

describe('SaveSurveyResult Controller', () => {
    test('Should call LoadSurveyById with correct values', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        const loadSurveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(makeFakeRequest())
        expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return 403 if LoadSurveyById returns null', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
    })
})