import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

export class DbLoadSurveys {
    constructor(private readonly loadSurveysRepository: LoadSurveysRepository) { }

    async load(): Promise<SurveyModel[]> {
        const surveys = await this.loadSurveysRepository.loadAll()
        return surveys
    }
}