const assert = require('assert')
const config = require('../config')

describe('Get impact factors from results', () => {

  /** @type import('./_types').ResultService */
  const service = config.getResultService()
  const setup = {
    productSystem: config.exampleSystem,
    impactMethod: config.exampleMethod
  }
  const dispose = (result, done) => {
    service.dispose(result, err => {
      if (err) {
        done(err)
        return
      }
      done()
    })
  }

  it('should get some impact results', (done) => {
    
    service.calculate(setup, (err, result) => {
      if (err) {
        done(err)
        return
      }

      const impacts = service.getImpacts(result)
      let resultCount = 0
      impacts.on('error', done)
      impacts.on('data', _impact => {
        resultCount++
      })
      impacts.on('end', () => {
        assert.ok(resultCount > 0)
        dispose(result, done)
      })
    })
  })

  it('should return impact factors for an indicator', (done) => {
    service.calculate(setup, (err, result) => {
      if (err) {
        done(err)
        return
      }
      const factors = service.getImpactFactors({
        result: result,
        indicator: config.exampleImpact,
      })
      let factorCount = 0
      factors.on('error', done)
      factors.on('data', _factor => {
        factorCount++
      })
      factors.on('end', () => {
        assert.ok(factorCount > 0)
        dispose(result, done)
      })
    })
  })
})
