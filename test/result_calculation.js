const assert = require('assert')
const config = require('../config')
const grpc = require('./_grpc')

describe('Test basic calculation', () => {

  /** @type import('./_types').ResultService */
  const service = config.getResultService()
  const setup = {
    productSystem: config.exampleSystem,
    impactMethod: config.exampleMethod
  }
  const withResult = async (fn) => {
    const result = await grpc.call(
      service, service.calculate, setup)
    await fn(result)
    await grpc.call(
      service, service.dispose, result)
  }

  it('should get a result', async () => {
    await withResult(async (result) => {
      assert.ok(result.id)
    })
  })

  it('should get flow results', async () => {
    await withResult(async (result) => {
      const flowResults = await grpc.streamCall(
        service, service.getInventory, result)
      assert.ok(flowResults.length > 0)
      // there should be some amounts in the results
      let total = 0
      for (const flowResult of flowResults) {
        if (flowResult.value) {
          total += Math.abs(flowResult.value)
        }
      }
      assert.ok(total > 0)
    })
  })

  it('should get an error', done => {
    grpc.call(service, service.calculate, {
      productSystem: { id: 'does-not-exist' }
    }).then(data => {
      done('unexpected data ' + data)
    }).catch(err => {
      done()
    })
  })

})