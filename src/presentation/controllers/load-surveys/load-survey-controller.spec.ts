import MockDate from 'mockdate'
import { LoadSurveys } from './load-survey-controller-protocols'
import { LoadSurveysController } from './load-surveys-controller'
import { noContent, ok, serverError } from '../../helpers/http/http-helper'
import { throwError, mockSurveysModels  } from '@/domain/test'
import { mockLoadSurveys } from '@/presentation/test/mock-survey'

type SutTypes = {
    sut: LoadSurveysController
    loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 if LoadSurveys returns empty', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockSurveysModels()))
  })

  test('Should return 204 on success', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(
      new Promise((resolve) => resolve([]))
    )
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})