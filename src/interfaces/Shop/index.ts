export interface IShopsResponsePayload {
  is_success: boolean;
  data: IShopProfilePayload;
  message: string;
}

export interface IShopProfilePayload {
  id: number;
  name: string;
  username: string;
  city: string;
  joined_at: string;
  total_product: number;
}

export interface IShopPayload {
  id: number;
  name: string;
  location: string;
}

export interface IShopDetailProps {
  shopId: number;
}

export interface IPropsShopProfileDetail {
  icon: JSX.Element;
  title: string;
  value: string;
}
