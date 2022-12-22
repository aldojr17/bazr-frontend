export interface IFilterPayload {
  category?: number;
  sortBy?: string;
  name?: string;
  limit?: number;
  sort?: string;
  page?: number;
  date?: string;
}

export interface ISearchFilterPayload {
  minPrice?: number;
  maxPrice?: number;
  category_id?: number;
  category_level?: string;
  rating?: number;
  location?: Array<Number>;
}

export interface ISearchParamsPayload extends Record<string, string> {
  name: string;
  category: string;
  city: string;
}

export const SearchFilterState: ISearchFilterPayload = {
  category_id: 0,
  category_level: "",
  location: [],
  maxPrice: 0,
  minPrice: 0,
  rating: 0,
};

export const SearchParamsState: ISearchParamsPayload = {
  name: "",
  category: "",
  city: "",
};
