export const API_PATH = {
  auth: {
    REGISTER: "/register",
    LOGIN: "/login",
    LOGIN_GOOGLE: "/login-google",
    REFRESH: "/refresh",
    CHECK_EMAIL: "/check-email",
    PASSWORD: "/reset-password",
  },
  user: {
    PROFILE: "/users/profile",
    AVATAR: "/users/avatar",
  },
  category: {
    CATEGORIES: "/categories",
    CATEGORIES_PRODUCT: "/categories/product",
  },
  product: {
    PRODUCTS: "/products",
    PRODUCTS_SHOP: "/products/shop",
  },
  cart: {
    CART: "/cart",
  },
  transaction: {
    TRANSACTIONS: "/transactions",
  },
  shop: {
    SHOPS_PROFILE: "/shops/profile",
  },
  wallet: {
    VERIFY_PIN: "/wallets/step-up/pin",
    PAYMENT_WALLET: "/payments/wallet-pay",
  },
};
