const assert = require('assert')
const config = require('../config')
const util = require('./util')

describe('Test the basic data service', () => {

  it('should get the impact method by ID', async () => {
    const data = config.getDataService()
    const dataSet = await util.call(data, data.get, {
      modelType: 'IMPACT_METHOD',
      id: config.exampleMethod.id
    })
    assert.strictEqual(
      dataSet.impactMethod.id, 
      config.exampleMethod.id)
  })

  it('should get the impact method by name', async () => {
    const data = config.getDataService()
    const byId = await util.call(data, data.get, {
      modelType: 'IMPACT_METHOD',
      id: config.exampleMethod.id
    })
    const byName = await util.call(data, data.get, {
      modelType: 'IMPACT_METHOD',
      name: byId.impactMethod.name
    })
    assert.strictEqual(
      byId.impactMethod.id,
      byName.impactMethod.id)
  })
})
