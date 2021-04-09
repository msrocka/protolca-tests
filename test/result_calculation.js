const assert = require('assert')
const config = require('../config')

describe('Test basic calculation', () => {

  /** @type import('./_types').ResultService */
  const service = config.getResultService()
  const setup = {
    productSystem: config.exampleSystem,
    impactMethod: config.exampleMethod
  }

  it('should get a result', async () => {
    const result = await config.call(
      service, service.calculate, setup)
    assert.ok(result.id)
    await config.call(
      service, service.dispose, result)
  })

  it('should get an error', done => {
    config.call(service, service.calculate, {
      productSystem: { id: 'does-not-exist' }
    }).then(data => {
      done('unexpected data ' + data)
    }).catch(err => {
      done()
    })
  })

})