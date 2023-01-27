export const API_PATH = {
  auth: {
    REGISTER: "/register",
    REGISTER_MERCHANT: "/shops",
    LOGIN: "/login",
    LOGIN_GOOGLE: "/login-google",
    REFRESH: "/refresh",
    CHECK_EMAIL: "/check-email",
    PASSWORD: "/reset-password",
  },
  user: {
    PROFILE: "/users/profile",
    AVATAR: "/users/avatar",
    FAVORITE_PRODUCT: "users/favorite",
    EMAIL: "/users/email",
    PASSWORD: "/users/password",
  },
  category: {
    CATEGORIES: "/categories",
    CATEGORIES_PRODUCT: "/categories/product",
  },
  product: {
    PRODUCTS: "/products",
    PRODUCTS_SHOP: "/products/shop",
    PRODUCTS_REVIEWS: "/products/reviews",
  },
  cart: {
    CART: "/cart",
  },
  transaction: {
    CHECKOUT: "/checkout",
    TRANSACTIONS: "/transactions",
  },
  shop: {
    SHOPS_PROFILE: "/shops/profile",
    UPLOAD_PRODUCT_PHOTOS: "/upload/product",
    SHOPS_PROMOTION: "/shops/promotions",
  },
  wallet: {
    VERIFY_PIN: "/wallets/step-up/pin",
    VERIFY_PASSWORD_PIN: "/wallets/step-up/password",
    PAYMENT_WALLET: "/payments/wallet-pay",
    UPDATE_PIN: "/wallets/pin",
    ACTIVATE_WALLET: "/wallets/activate",
  },
  voucher: {
    VOUCHER: "/vouchers",
    SHOP_VOUCHER: "/shop-vouchers",
  },
  shipping: {
    SHIPPING: "/shipping-cost",
  },
};
