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
};

export default routes;
