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
    ADDRESSES: "/users/addresses",
    ORDER: (orderId: number) => `/users/orders/${orderId}`,
    REVIEW: (productOrderId: number) => `/users/reviews/${productOrderId}`,
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
    ORDER_DETAILS: (orderId: number) => `/transactions/orders/${orderId}`,
    TRANSACTION_DETAILS: (transactionId: number) =>
      `/transactions/${transactionId}`,
  },
  sealabs_pay: {
    SEALABS_PAY: "/sealabs_pay",
  },
  shop: {
    SHOPS: "/shops",
    SHOPS_PROFILE: "/shops/profile",
    UPLOAD_PRODUCT_PHOTOS: "/upload/product",
    SHOPS_PROMOTION: "/shops/promotions",
    SET_SHOP_DEFAULT_ADDRESS: "/shops/address",
    SHOPS_WITHDRAWAL: "/shops/withdrawal",
    COURIER: "/shops/couriers",
    DASHBOARD: "/shops/dashboard",
    SHOPS_PRODUCTS: "/shops/products",
  },
  wallet: {
    VERIFY_PIN: "/wallets/step-up/pin",
    VERIFY_PASSWORD_PIN: "/wallets/step-up/password",
    PAYMENT_WALLET: "/payments/wallet-pay",
    UPDATE_PIN: "/wallets/pin",
    ACTIVATE_WALLET: "/wallets/activate",
    WALLET_HISTORY: "/wallets/history",
  },
  voucher: {
    VOUCHER: "/vouchers",
    SHOP_VOUCHER: "/shop-vouchers",
  },
  shipping: {
    SHIPPING: "/shipping-cost",
  },
  address: {
    PROVINCES: "/address/region",
    CITIES: (province_id: number) => `/address/region?province=${province_id}`,
    SUBDISTRICTS: (city_id: number) => `/address/region?city=${city_id}`,
    ADDRESS: "/address",
    UPDATE_ADDRESS: (address_id: number) => `/address/${address_id}`,
    SET_USER_DEFAULT_ADDRESS: "/address/default",
  },
  refund: {
    REFUNDS: "/refunds",
    SELLER_REFUNDS: "/refunds/seller",
    BUYER_REFUNDS: "/refunds/buyer",
    REFUND_DETAIL: (id: number) => `/refunds/${id}`,
  },
};
