import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import EditProductForm from "../pages/Seller/Product/EditProductForm";
import AuthRoutes from "./AuthRoutes";
import LayoutPlainRoutes from "./LayoutPlainRoutes";
import LayoutRoutes from "./LayoutRoutes";
import SellerRoutes from "./SellerRoutes";
import UserRoutes from "./UserRoutes";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const RegisterMerchant = React.lazy(
  () => import("../pages/Auth/RegisterMerchant")
);
const ResetRequest = React.lazy(() => import("../pages/Auth/ResetRequest"));
const ResetPassword = React.lazy(() => import("../pages/Auth/ResetPassword"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const Search = React.lazy(() => import("../pages/Search/SearchPage"));
const Cart = React.lazy(() => import("../pages/Cart/Cart"));
const Checkout = React.lazy(() => import("../pages/Checkout/Checkout"));
const CategoryPrimary = React.lazy(
  () => import("../pages/Category/CategoryPrimary")
);
const CategorySecondary = React.lazy(
  () => import("../pages/Category/CategorySecondary")
);
const CategoryTertiary = React.lazy(
  () => import("../pages/Category/CategoryTertiary")
);
const UserFavorite = React.lazy(() => import("../pages/User/UserFavorite"));
const Profile = React.lazy(() => import("../pages/User/User"));
const UserWallet = React.lazy(() => import("../pages/User/UserWallet"));
const SellerHome = React.lazy(() => import("../pages/Seller/Home/Home"));
const SellerVoucher = React.lazy(
  () => import("../pages/Seller/Voucher/Voucher")
);
const AddProductForm = React.lazy(
  () => import("../pages/Seller/Product/AddProductForm")
);
const ProductDashboard = React.lazy(
  () => import("../pages/Seller/Product/ProductDashboard")
);
const SellerVoucherCreate = React.lazy(
  () => import("../pages/Seller/Voucher/VoucherCreate")
);
const SellerVoucherEdit = React.lazy(
  () => import("../pages/Seller/Voucher/VoucherEdit")
);
const SellerVoucherDuplicate = React.lazy(
  () => import("../pages/Seller/Voucher/VoucherDuplicate")
);
const SellerVoucherDetail = React.lazy(
  () => import("../pages/Seller/Voucher/VoucherDetail")
);
const ProductDetail = React.lazy(
  () => import("../pages/ProductDetail/ProductDetail")
);
const ShopHome = React.lazy(() => import("../pages/Shop/ShopHome"));
const SellerPromotion = React.lazy(
  () => import("../pages/Seller/Promotion/Promotion")
);
const SellerPromotionCreate = React.lazy(
  () => import("../pages/Seller/Promotion/PromotionCreate")
);
const SellerPromotionEdit = React.lazy(
  () => import("../pages/Seller/Promotion/PromotionEdit")
);
const SellerPromotionDetail = React.lazy(
  () => import("../pages/Seller/Promotion/PromotionDetail")
);
const SellerPromotionDuplicate = React.lazy(
  () => import("../pages/Seller/Promotion/PromotionDuplicate")
);
const Shipment = React.lazy(() => import("../pages/Seller/Shipment/Shipment"));

const SellerFinance = React.lazy(
  () => import("../pages/Seller/Finance/Finance")
);

const SealabsPayRedirect = React.lazy(
  () => import("../pages/SealabsPay/Redirect")
);
const SellerOrder = React.lazy(() => import("../pages/Seller/Order/Order"));
const SellerOrderDetail = React.lazy(
  () => import("../pages/Seller/Order/OrderDetail")
);

const DeliveryLabel = React.lazy(
  () => import("../pages/Seller/Shipment/DeliveryLabel")
);

const AdminPage = React.lazy(() => import("../pages/Admin/AdminPage"));

const RouteList = () => {
  let routes = (
    <Routes>
      <Route element={<LayoutRoutes />}>
        <Route path="/" element={<Home />} errorElement={<NotFound />} />
        <Route path="/search" element={<Search />} />

        <Route path="/p/:cPrimary" element={<CategoryPrimary />} />
        <Route
          path="/p/:cPrimary/:cSecondary"
          element={<CategorySecondary />}
        />
        <Route
          path="/p/:cPrimary/:cSecondary/:cTertiary"
          element={<CategoryTertiary />}
        />

        <Route path="/shop/:shopUsername" element={<ShopHome />} />
      </Route>

      <Route element={<LayoutPlainRoutes />}>
        <Route
          path="/pdp/:id/:title"
          element={<ProductDetail />}
          errorElement={<NotFound />}
        />
        <Route element={<UserRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/shipment" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<UserWallet />} />
          <Route path="/favorite" element={<UserFavorite />} />
          <Route
            path="/sealabs_pay/redirect"
            element={<SealabsPayRedirect />}
          />
        </Route>
      </Route>

      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-merchant" element={<RegisterMerchant />} />
        <Route path="/reset-request" element={<ResetRequest />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<SellerRoutes />}>
        <Route path="/seller/home" element={<SellerHome />} />
        <Route path="/seller/shipment" element={<Shipment />} />
        <Route path="/seller/voucher" element={<SellerVoucher />} />
        <Route path="/seller/product" element={<ProductDashboard />} />
        <Route path="/seller/product/new" element={<AddProductForm />} />
        <Route path="/seller/product/:id/edit" element={<EditProductForm />} />
        <Route
          path="/seller/voucher/create"
          element={<SellerVoucherCreate />}
        />
        <Route
          path="/seller/voucher/:id/edit"
          element={<SellerVoucherEdit />}
        />
        <Route
          path="/seller/voucher/:id/duplicate"
          element={<SellerVoucherDuplicate />}
        />
        <Route
          path="/seller/voucher/:id/detail"
          element={<SellerVoucherDetail />}
        />
        <Route path="/seller/promotion" element={<SellerPromotion />} />
        <Route
          path="/seller/promotion/create"
          element={<SellerPromotionCreate />}
        />
        <Route
          path="/seller/promotion/:id/edit"
          element={<SellerPromotionEdit />}
        />
        <Route
          path="/seller/promotion/:id/detail"
          element={<SellerPromotionDetail />}
        />
        <Route
          path="/seller/promotion/:id/duplicate"
          element={<SellerPromotionDuplicate />}
        />
        <Route path="/seller/order/:id/label" element={<DeliveryLabel />} />
        <Route path="/seller/finance" element={<SellerFinance />} />
        <Route path="/seller/order" element={<SellerOrder />} />
        <Route
          path="/seller/order/:id/detail"
          element={<SellerOrderDetail />}
        />
      </Route>

      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return routes;
};

export default RouteList;
