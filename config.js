const loader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

const URL = 'localhost:8080'

/** @type import('./config').Ref */
const EXAMPLE_SYSTEM_REF = {
  id: '66344e38-411a-4996-8062-e92dd3cd211c'
}



const protoDir = `${__dirname}/protos`

/** @type import('./config').ResultService */
let _resultService = null;
export function getResultService() {
  if (_resultService) {
    return _resultService
  }
  const p = loadProto('results')
  _resultService = p.protolca.services.ResultService(
    URL, grpc.credentials.createInsecure())
  return _resultService
}

function loadProto(proto) {
  const fullPath = `${__dirname}/protos/${proto}.protos`
  const protos = loader.loadSync(fullPath, { enums: String })
  return grpc.loadPackageDefinition(protos)
}
