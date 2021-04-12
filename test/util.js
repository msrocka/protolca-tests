// this module wraps gRPC calls into promises so
// that we can simply use async/await instead of
// callback chains
const config = require('../config')

function call(service, fn, message) {
  return new Promise((resolve, reject) => {
    fn.call(service, message, (err, val) => {
      if (err) {
        reject(err)
      } else {
        resolve(val)
      }
    })
  })
}

exports.call = call

function streamCall(service, fn, message) {
  return new Promise((resolve, reject) => {
    const data = []
    const r = fn.call(service, message)
    r.on('error', reject)
    r.on('data', elem => data.push(elem))
    r.on('end', () => resolve(data))
  })
}

exports.streamCall = streamCall

async function withResult(fn) {
  /** @type import('./_types').ResultService */
  const service = config.getResultService()
  const setup = {
    productSystem: config.exampleSystem,
    impactMethod: config.exampleMethod
  }
  /** @type import('./_types').Result */
  const result = await call(
    service, service.calculate, setup)
  await fn(service, result)
  await call(
    service, service.dispose, result)
}

exports.withResult = withResult
