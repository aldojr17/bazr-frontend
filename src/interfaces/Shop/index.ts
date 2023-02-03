export interface IShopsResponsePayload {
  is_success: boolean;
  data: IShopProfilePayload;
  message: string;
}

export interface IShopProfilePayload {
  id: number;
  name: string;
  username: string;
  profile_picture: string;
  city: string;
  joined_at: string;
  total_product: number;
}

export interface IShopPayload {
  id: number;
  name: string;
  username: string;
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
  shopProfile: IShopProfilePayload | null;
  isLoaded: boolean;
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

export interface IProductUploadPhotoPayload {
  photos: File[];
}

export interface IProductPhotoResponse {
  data: ICloudinaryResponse;
  is_success: boolean;
  message: string;
}

export interface ICloudinaryResponse {
  urls: string[];
  error: string[];
}

export interface IFileInputBtnProps {
  imgList: File[];
  setImgList: React.Dispatch<React.SetStateAction<File[]>>;
}

export interface ICreateShopTransferPayload {
  amount: number;
}

export interface IShopWithdrawalResponse {
  data: IShopFinance;
  is_success: boolean;
  message: string;
}

export interface IShopFinance {
  balance: number;
  withdrawal_details: IShopWithdrawal[];
}

export interface IShopWithdrawal {
  amount: number;
  withdrawal_date: string;
}

export interface IShopDashboardResponsePayload {
  data: IShopDashboard;
  is_success: boolean;
  message: string;
}

export interface IShopDashboard {
  id: number;
  name: string;
  username: string;
  profile_picture: string;
  city: string;
  joined_at: string;
  total_product_sold: number;
  total_sales: number;
  total_order: number;
  new_order: number;
  ongoing_order: number;
  completed_order: number;
}

export interface IEditProductStatusPayload {
  status: boolean;
  product_ids: number[];
}
