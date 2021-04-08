declare module 'config' {

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

  export interface ResultService {
    getImpactFactors: (req: ImpactFactorRequest) =>
      StreamResponse<ImpactFactorResponse>;
  }

  export interface StreamResponse<T> {
    on: (event: 'data', fn: (datum: T) => void) => void;
    on: (event: 'error', fn: (err: any) => void) => void;
    on: (event: 'end', fn: () => void) => void;
    on: (event: 'status', fn: (status: any) => void) => void;
  }

  export function getResultService(): ResultService;

}
