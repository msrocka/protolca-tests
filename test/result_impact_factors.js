const assert = require('assert')
const config = require('../config')
const grpc = require('./_grpc')

describe('Get impact factors from results', () => {

  /** @type import('./_types').ResultService */
  const service = config.getResultService()
  const setup = {
    productSystem: config.exampleSystem,
    impactMethod: config.exampleMethod
  }

  it('should get some impact results', async () => {
    const result = await grpc.call(
      service, service.calculate, setup)
    const impacts = await grpc.streamCall(
      service, service.getImpacts, result)
    assert.ok(impacts.length > 0)
    await grpc.call(
      service, service.dispose, result)
  })

  it('should return impact factors for an indicator', async () => {
    const result = await grpc.call(
      service, service.calculate, setup)
    const factors = await grpc.streamCall(
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
    await grpc.call(
      service, service.dispose, result)

  })
})
