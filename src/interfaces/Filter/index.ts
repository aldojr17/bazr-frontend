export interface IFilterPayload {
  sortBy?: string;
  limit?: number;
  sort?: string;
  page?: number;
}

export interface ISearchFilterPayload extends IFilterPayload {
  name?: string;
  min_price?: number;
  max_price?: number;
  category?: number;
  category_level?: number;
  min_rating?: number;
  city?: string;
}

export interface ISearchParamsPayload {
  q: string;
  pmin?: string;
  pmax?: string;
  c?: string;
  cl?: string;
  rt?: string;
  city?: string;
}

export const SearchFilterState: ISearchFilterPayload = {
  category: 0,
  category_level: 0,
  city: "",
  max_price: 0,
  min_price: 0,
  min_rating: 0,
};

export const SearchParamsState: ISearchParamsPayload = {
  q: "",
  pmin: "",
  pmax: "",
  c: "",
  cl: "",
  rt: "",
  city: "",
};

export interface IReviewsParamsPayload extends IFilterPayload {
  rating?: string;
  type?: string;
}
export interface ITransactionHistoryParams extends IFilterPayload {
  status?: string;
}

export interface IWalletHistoryFilterPayload extends IFilterPayload {
  type?: string;
}
