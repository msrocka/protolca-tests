// this module wraps gRPC calls into promises so
// that we can simply use async/await instead of
// callback chains

exports.call = (service, fn, message) => {
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

exports.streamCall = (service, fn, message) => {
  return new Promise((resolve, reject) => {
    const data = []
    const r = fn.call(service, message)
    r.on('error', reject)
    r.on('data', elem => data.push(elem))
    r.on('end', () => resolve(data))
  })
}