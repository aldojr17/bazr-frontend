export interface IShopsResponsePayload {
  is_success: boolean;
  data: IShopProfilePayload;
  message: string;
}

// TODO: Wait aldo to update API, he will add shop foto profile.
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

export interface IShopHomeProductsProps {
  shopId: number;
  category_id?: number;
  category_level?: number;
  is_auto_scroll_to_products?: boolean;
  scrollToSortOption: () => void;
  sortOptionRef: React.RefObject<HTMLDivElement>;
  sortByOption: {
    RECOMMENDED: string;
    NEWEST: string;
    MOST_BUY: string;
    PRICE: string;
  };
  sortOption: {
    ASCENDING: string;
    DESCENDING: string;
  };
  requirements: {
    quantityProductToDisplay: number;
    sortBy: {
      purchased: string;
      most: string;
    };
    quantityProductToDisplayLessVersion: number;
    tabQuantityToBeDisplay: number;
  };
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface IShopCategoryResponsePayload {
  data: IPrimaryCategory[];
  is_success: boolean;
  message: string;
}

export interface IPrimaryCategory {
  id: number;
  name: string;
  secondary_category: ISecondaryCategory[];
}

export interface ISecondaryCategory {
  id: number;
  name: string;
  tertiary_category: ITertiaryCategory[];
}

export interface ITertiaryCategory {
  id: number;
  name: string;
}

export interface IFlatShopCategories {
  id: number;
  name: string;
  level: number;
}

export interface IShopProfileProps {
  isFetchShopProfileLoaded: boolean;
  shopProfile: IShopProfilePayload | null;
}

export interface IShopHomeProductsOverviewProps {
  shopId: number;
  resetCategory: () => void;
  setIndexActiveTab: React.Dispatch<React.SetStateAction<number>>;
  scrollToSortOption: () => void;
  resetSortBy: () => void;
  resetSort: () => void;
  resetPage: () => void;
}

export interface IShopCategoryBesideProps {
  shopCategories: IFlatShopCategories[];
  activeCategoryId: number;
  activeCategoryLevel: number;
  setCategoryId: (value: React.SetStateAction<number>) => void;
  setCategoryLevel: (value: React.SetStateAction<number>) => void;
  resetCategory: () => void;
  setIndexActiveTab: (value: React.SetStateAction<number>) => void;
  setIndexCategorySelect: React.Dispatch<React.SetStateAction<number>>;
}
