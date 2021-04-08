const assert = require('assert')
const config = require('../config')

describe('Get impact factors from results', () => {

  /** @type import('./_types').ResultService */
  const service = config.getResultService()
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
    const setup = {
      productSystem: config.exampleSystem,
      impactMethod: config.exampleMethod
    }
    service.calculate(setup, (err, result) => {
      if (err) {
        done(err)
        return
      }

      const impacts = service.getImpacts(result)
      let resultCount = 0
      impacts.on('error', err => done(err))
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

    done('not implemented')
  })
})
