export interface IShippingCostPayload {
  origin: string;
  destination: string;
  weight: number;
  courier: string;
}

export interface IShippingCostResponse {
  data: IShippingCostDataResponse;
  is_success: boolean;
  message: string;
}

export interface IShippingCostDataResponse {
  rajaongkir: IShippingCostDataDetailResponse;
}

export interface IShippingCostDataDetailResponse {
  results: IShippingCostDetailResponse[];
}

export interface IShippingCostDetailResponse {
  code: string;
  costs: IShippingCost[];
  name: string;
}

export interface IShippingCost {
  cost: IShippingCostETDValueResponse[];
  description: string;
  service: string;
}

export interface IShippingCostETDValueResponse {
  etd: string;
  note: string;
  value: number;
}
