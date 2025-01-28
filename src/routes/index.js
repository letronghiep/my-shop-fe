import HomeLayout from "../layout/HomeLayout";
import ShopLayout from "../layout/ShopLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OrderListPage from "../pages/seller/order/OrderListPage";
import ProductCreatePage from "../pages/seller/product/ProductCreatePage";
import ProductListPage from "../pages/seller/product/ProductListPage";
import EditProfile from "../pages/seller/profile/edit/EditProfile";
import SalePage from "../pages/seller/SalePage";
import UnauthorizedPage from "../pages/Unauthorized";

// import ShopLayout from "../layout/ShopLayout";
// import EditProfile from "../pages/seller/profile/edit/EditProfile";
// import SalePage from "../pages/seller/SalePage";

// export const routes = [
//   {
//     path: "/",
//     component: HomePage,
//     exact: true,
//     private: false,
//     layout: HomeLayout,
//   },
//   {
//     path: "/login",
//     component: LoginPage,
//     exact: true,
//     private: false,
//   },
//   {
//     path: "/register",
//     component: RegisterPage,
//     private: false,
//   },
//   {
//     path: "/seller",
//     component: SalePage,
//   },
//   // Add more routes as needed...
//   {
//     path: "/unauthorized",
//     component: UnauthorizedPage,
//     private: false,
//   },
//   {
//     path: "/seller/profile/edit/:userId",
//     component: EditProfile,
//     private: true,
//   },
//   {
//     path: "*",
//     exact: true,
//     private: false,
//   },
//   {
//     path: "/seller/*",
//     private: true,
//     layout: ShopLayout,
//     permission: "shop",
//   },
// ];
export const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    private: false,
    layout: HomeLayout,
    
  },
  {
    path: "/login",
    component: LoginPage,
    exact: true,
    private: false,
    layout: null,
  },
  {
    path: "/register",
    component: RegisterPage,
    exact: true,
    private: false,
    layout: null,
  },
  {
    path: "/unauthorized",
    component: UnauthorizedPage,
    exact: true,
    private: false,
    layout: null,
  },
  {
    path: "/seller",
    component: SalePage, // Component chính của Seller
    exact: true,
    private: true,
    layout: ShopLayout,
    permission: "shop",
  },
  {
    path: "/seller/profile/edit/:userId",
    component: EditProfile,
    exact: true,
    private: true,
    layout: ShopLayout,
    permission: "shop",
  },
  {
    path: "/seller/orders/list",
    component: OrderListPage,
    exact: true,
    private: true,
    layout: ShopLayout,
    permission: "shop",
  },
  {
    path: "/seller/products/list",
    component: ProductListPage,
    exact: true,
    private: true,
    layout: ShopLayout,
    permission: "shop",
  },
  {
    path: "/seller/products/create",
    component: ProductCreatePage,
    exact: true,
    private: true,
    layout: ShopLayout,
    permission: "shop",
  },
  // {
  //   path: "*",
  //   component: NotFoundPage, // Trang 404
  //   private: false,
  //   layout: null,
  // },
];
