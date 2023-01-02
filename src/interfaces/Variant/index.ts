export interface IVariantGroupPayload {
  id: number;
  name: string;
  product_id: number;
  variant_type: IVariantTypePayload[];
}

export interface IVariantTypePayload {
  id: number;
  name: string;
  price: number;
  stock: number;
  variant_group_id: number;
}
