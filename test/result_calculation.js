const assert = require('assert')
const config = require('../config')
const util = require('./util')

describe('Test basic calculation', () => {

  it('should get a result', async () => {
    await util.withResult(async (_, result) => {
      assert.ok(result.id)
    })
  })

  it('should get flow results', async () => {
    await util.withResult(async (service, result) => {
      const flowResults = await util.streamCall(
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
    const service = config.getResultService()
    util.call(service, service.calculate, {
      productSystem: { id: 'does-not-exist' }
    }).then(data => {
      done('unexpected data ' + data)
    }).catch(err => {
      done()
    })
  })

})