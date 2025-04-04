export class QueryBuilder {
  private readonly query = []

  match(data: Object): QueryBuilder {
    this.query.push({
      $match: data
    })
    return this
  }

  group(data: Object): QueryBuilder {
    this.query.push({
      $group: data
    })
    return this
  }

  unwind(data: Object): QueryBuilder {
    this.query.push({
      $unwind: data
    })
    return this
  }

  lookup(data: Object): QueryBuilder {
    this.query.push({
      $lookup: data
    })
    return this
  }

  project(data: Object): QueryBuilder {
    this.query.push({
      $project: data
    })
    return this
  }

  sort(data: object): QueryBuilder {
    this.query.push({
      $sort: data
    })
    return this
  }

  build(): Object[] {
    return this.query
  }
}