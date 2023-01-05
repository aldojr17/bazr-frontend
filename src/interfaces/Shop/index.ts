export interface IShopsResponsePayload {
  is_success: boolean;
  data: IShopProfilePayload;
  message: string;
}

export interface IShopProfilePayload {
  id: number;
  name: string;
  usernamr: string;
  city: string;
  joined_at: string;
  total_product: number;
}

export interface IShopDetailProps {
  shopId: number;
}
