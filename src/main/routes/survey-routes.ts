import { Router } from 'express'
import { adapterRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyController } from '../factories/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adapterMiddleware } from '../adapters/express-middleware-adapter'
import { makeLoadSurveysController } from '../factories/survey/load-surveys/load-surveys-controller-factory'

export default (router: Router): void => {
    const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'))
    const auth = adapterMiddleware(makeAuthMiddleware())
    router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyController()))
    router.get('/surveys', auth, adapterRoute(makeLoadSurveysController()))
}