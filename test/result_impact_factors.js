const assert = require('assert')
const config = require('../config')
const util = require('./util')

describe('Get impact factors from results', () => {

  it('should get some impact results', async () => {

    await util.withResult(async (service, result) => {
      const impacts = await util.streamCall(
        service, service.getImpacts, result)
      assert.ok(impacts.length > 0)
    })

  })

  it('should return impact factors for an indicator', async () => {

    await util.withResult(async (service, result) => {
      const factors = await util.streamCall(
        service, service.getImpactFactors, {
        result: result,
        indicator: config.exampleImpact,
      })
      assert.ok(factors.length > 0)
      for (let factor of factors) {
        assert.strictEqual(
          factor.indicator.id,
          config.exampleImpact.id)
      }
    })
  })
})
