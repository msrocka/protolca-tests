const loader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

const URL = 'localhost:8080'

const EXAMPLE_SYSTEM_REF = {
  id: '66344e38-411a-4996-8062-e92dd3cd211c'
}

const protoDir = `${__dirname}/protos`

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

function loadProto(proto) {
  const fullPath = `${__dirname}/protos/${proto}.proto`
  const protos = loader.loadSync(fullPath, { enums: String })
  return grpc.loadPackageDefinition(protos)
}
