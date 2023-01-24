const routes = {
  HOME: "/",
  SEARCH: "/search",
  PDP: (id: number, title: string) => `/search/${id}/${title}`,
  PRIMARY_CATEGORY: (cPrimary: string) => `/p/${cPrimary}`,
  SECONDARY_CATEGORY: (cPrimary: string, cSecondary: string) =>
    `/p/${cPrimary}/${cSecondary}`,
  TERTIARY_CATEGORY: (
    cPrimary: string,
    cSecondary: string,
    cTertiary: string
  ) => `/p/${cPrimary}/${cSecondary}/${cTertiary}`,
  CART: "/cart",
  CART_SHIPMENT: "/cart/shipment",
  SHOP: (shopUsername: string) => `/shop/${shopUsername}`,
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_MERCHANT: "/register-merchant",
  PROFILE: "/profile",
  WALLET: "/wallet",
  SELLER_HOME: "/seller/home",
  SELLER_VOUCHER: "/seller/voucher",
  SELLER_VOUCHER_CREATE: "/seller/voucher/create",
  SELLER_VOUCHER_EDIT: (id: number) => `/seller/voucher/${id}/edit`,
  SELLER_VOUCHER_DETAIL: (id: number) => `/seller/voucher/${id}/detail`,
  SELLER_VOUCHER_DUPLICATE: (id: number) => `/seller/voucher/${id}/duplicate`,
  SELLER_VOUCHER_DELETE: (id: number) => `/seller/voucher/${id}/delete`,
};

export default routes;
