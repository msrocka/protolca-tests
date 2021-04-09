export interface Empty {}

export interface Ref {
  type?: string;
  id?: string;
  name?: string;
  refUnit?: string;
  location?: string;
}

export interface Result {
  id: string;
}

export interface ImpactResult {
  impactCategory: Ref;
  value: number;
}

export interface FlowResult {
  flow: Ref;
  input: boolean;
  value: number;
  location?: Ref;
}

export interface ImpactFactorRequest {
  result: Result;
  indicator?: Ref;
  flow?: Ref;
}

export interface ImpactFactorResponse {
  indicator: Ref;
  flow: Ref;
  value: number;
}

export interface CalculationSetup {
  productSystem: Ref;
  impactMethod: Ref;
}

export interface ResultService {

  calculate: (setup: CalculationSetup, resp: Response<Result>) => void;

  getInventory: (result: Result) => StreamResponse<FlowResult>;

  getImpacts: (result: Result) => StreamResponse<ImpactResult>;

  getImpactFactors: (req: ImpactFactorRequest) =>
    StreamResponse<ImpactFactorResponse>;

  dispose: (result: Result, resp: Response<Empty>) => void;
}

export interface Response<T> {
  (error: any, data: T): void;
}

export interface StreamResponse<T> {
  on: (event: 'data', fn: (datum: T) => void) => void;
  on: (event: 'error', fn: (err: any) => void) => void;
  on: (event: 'end', fn: () => void) => void;
  on: (event: 'status', fn: (status: any) => void) => void;
}
