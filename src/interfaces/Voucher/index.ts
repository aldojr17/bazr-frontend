export interface IVoucherPayload {
  id: number;
  code: string;
  name: string;
  quota: number;
  benefit: number;
  benefit_percentage: number;
  min_purchase: number;
  start_date: string;
  expiry_date: string;
}

export interface IVoucherResponsePayload {
  is_success: boolean;
  data: IVoucherPayload;
  message: string;
}

export interface IVouchersResponsePayload {
  is_success: boolean;
  data: IVoucherPaginationPayload;
  message: string;
}

export interface IVoucherPaginationPayload {
  current_page: number;
  data: IVoucherPayload[];
  limit: number;
  total: number;
  total_page: number;
}

export interface IVoucherFormProps {
  title: string;
  id: number;
  code: string;
  name: string;
  quota: number;
  benefit: number;
  benefit_percentage: number;
  min_purchase: number;
  start_date: string;
  expiry_date: string;
  isLoading: boolean;
  isDisabled: boolean;
  isEdit?: boolean;
  onSubmit: (payload: IVoucherPayload) => void;
  onCancel: () => void;
}
