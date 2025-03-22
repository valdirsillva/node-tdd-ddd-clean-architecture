import { Controller } from "@/presentation/http"
import { LoadSurveysController } from "@/presentation/controllers/load-surveys/load-surveys-controller"
import { makeLogControllerDecorator } from "../../../decorators/log-controller-decorator-factory"
import { makeLoadSurveys } from "../../../usecases/survey/add-survey/db-load-surveys-factory"

export const makeLoadSurveysController = (): Controller => {
  const loadSurveys = makeLoadSurveys()

  const controller = new LoadSurveysController(loadSurveys)
  return makeLogControllerDecorator(controller)
}