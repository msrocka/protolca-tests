const loader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

const URL = 'localhost:8080'

exports.exampleSystem = {
  id: '66344e38-411a-4996-8062-e92dd3cd211c'
}
exports.exampleMethod = {
  id: '9a597be4-ce40-4acd-9ace-ca8edebce13f'
}
exports.exampleImpact = {
  id: '8a1d63db-3f8b-415f-841d-5dc1d2d5fd59'
}
exports.exampleFlow = {
  id: '77e416eb-a363-4258-a04e-171d843a6460'
}

let _resultService = null;
exports.getResultService = () => {
  if (_resultService) {
    return _resultService
  }
  const p = loadProto('results')
  _resultService = new p.protolca.services.ResultService(
    URL, grpc.credentials.createInsecure())
  return _resultService
}

let _dataService = null;
exports.getDataService = () => {
  if (_dataService) {
    return _dataService
  }
  const p = loadProto('services')
  _dataService = new p.protolca.services.DataService(
    URL, grpc.credentials.createInsecure())
  return _dataService
}

function loadProto(proto) {
  const fullPath = `${__dirname}/protos/${proto}.proto`
  const protos = loader.loadSync(fullPath, { enums: String })
  return grpc.loadPackageDefinition(protos)
}
