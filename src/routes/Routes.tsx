import { formatProductUrl } from "../util/util";

const routes = {
  HOME: "/",
  SEARCH: (query?: string, c?: number, cl?: number) =>
    `/search?q=${query}${c && `&c=${c}`}${cl && `&cl=${cl}`}`,
  PDP: (id: number, productName: string) =>
    `/pdp/${id}/${formatProductUrl(productName)}`,
  PRIMARY_CATEGORY: (cPrimary: string) => `/p/${cPrimary}`,
  SECONDARY_CATEGORY: (
    cPrimary: string,
    cSecondary: string,
    cSecondaryId: number
  ) => `/p/${cPrimary}/${cSecondary}?q=&c=${cSecondaryId}&cl=2`,
  TERTIARY_CATEGORY: (
    cPrimary: string,
    cSecondary: string,
    cTertiary: string,
    cTertiaryId: number
  ) => `/p/${cPrimary}/${cSecondary}/${cTertiary}?q=&c=${cTertiaryId}&cl=3`,
  CART: "/cart",
  CART_SHIPMENT: "/cart/shipment",
  SHOP: (shopUsername: string) => `/shop/${shopUsername}`,
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_MERCHANT: "/register-merchant",
  PROFILE: "/profile",
  WALLET: "/wallet",
  FAVORITE: "/favorite",
  SELLER_HOME: "/seller/home",
  SELLER_VOUCHER: "/seller/voucher",
  SELLER_VOUCHER_CREATE: "/seller/voucher/create",
  SELLER_VOUCHER_EDIT: (id: number) => `/seller/voucher/${id}/edit`,
  SELLER_VOUCHER_DETAIL: (id: number) => `/seller/voucher/${id}/detail`,
  SELLER_VOUCHER_DUPLICATE: (id: number) => `/seller/voucher/${id}/duplicate`,
  SELLER_VOUCHER_DELETE: (id: number) => `/seller/voucher/${id}/delete`,
  SELLER_PROMOTION: "/seller/promotion",
  SELLER_PROMOTION_CREATE: "/seller/promotion/create",
  SELLER_PROMOTION_EDIT: (id: number) => `/seller/promotion/${id}/edit`,
  SELLER_PROMOTION_DETAIL: (id: number) => `/seller/promotion/${id}/detail`,
  SELLER_PROMOTION_DUPLICATE: (id: number) =>
    `/seller/promotion/${id}/duplicate`,
  SELLER_PRODUCT: "/seller/product",
  SELLER_PRODUCT_CREATE: "/seller/product/new",
  SELLER_PRODUCT_EDIT: (id: number) => `/seller/product/${id}/edit`,
  SELLER_FINANCE: "/seller/finance",
  SELLER_ORDER: "/seller/order",
  SELLER_ORDER_DETAIL: (id: number) => `/seller/order/${id}/detail`,
  SELLER_ORDER_LABEL: (id: number) => `/seller/order/${id}/label`,
  ADMIN: "/admin",
  SEARCH_HANDLESEARCH: (value: string) => `/search?q=${value}`,
};

export default routes;
