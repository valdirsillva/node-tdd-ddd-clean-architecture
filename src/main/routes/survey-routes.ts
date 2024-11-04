import { adapterRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { Router } from 'express'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
    router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyController()))
    router.get('/surveys', auth, adapterRoute(makeLoadSurveysController()))
}