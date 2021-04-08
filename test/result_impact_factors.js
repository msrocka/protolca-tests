const assert = require('assert')
const config = require('../config')

describe('Get impact factors from results', () => {
  const service = config.getResultService()

  it('should return impact factors for an indicator', () => {
    assert.strictEqual('a', 'b')
  })
})
