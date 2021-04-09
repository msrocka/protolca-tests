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

  it('should get a result', async () => {
    const result = await grpc.call(
      service, service.calculate, setup)
    assert.ok(result.id)
    await grpc.call(
      service, service.dispose, result)
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