import { Controller } from "../../../../presentation/http"
import { LoadSurveysController } from "../../../../presentation/controllers/load-surveys/load-surveys-controller"
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory"
import { makeDbLoadSurveys } from "../../usecases/survey/add-survey/db-load-surveys-factpry"

export const makeLoadSurveysController = (): Controller => {
    const controller = new LoadSurveysController(makeDbLoadSurveys())
    return makeLogControllerDecorator(controller)
}