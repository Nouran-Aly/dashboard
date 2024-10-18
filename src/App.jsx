import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./Components/Layout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Store from "./Components/Store/Store";
import StoreRequestsDetails from "./Components/Store/StoreRequestsDetails";
import StoresData from "./Components/Store/StoresData";
import OrdersHistory from "./Components/Store/OrdersHistory";
import OrderDetails from "./Components/Store/OrderDetails";
import StoreDetails from "./Components/Store/StoreDetails";
import StoreSubscription from "./Components/Store/StoreSubscription";
import Orders from "./Components/Orders/Orders";
import RecentOrders from "./Components/Orders/RecentOrders";
import RecentShippedOrders from "./Components/Orders/RecentShippedOrders";
import RecentReceivedOrders from "./Components/Orders/RecentReceivedOrders";
import RefundRequests from "./Components/Orders/RefundRequests";
import ReturnedItems from "./Components/ReturnedItems/ReturnedItems";
import WrongItems from "./Components/ReturnedItems/WrongItems";
import ChangedHisMind from "./Components/ReturnedItems/ChangedHisMind";
import MissingItems from "./Components/ReturnedItems/MissingItems";
import ReturnedWrongItem from "./Components/ReturnedItems/ReturnedWrongItem";
import ReturnedMissingItem from "./Components/ReturnedItems/ReturnedMissingItem";
import ReturnChangedHisMind from "./Components/ReturnedItems/ReturnChangedHisMind";
import Customers from "./Components/Customers/Customers";
import CustomersData from "./Components/Customers/CustomersData";
import CustomersOrders from "./Components/Customers/CustomerOrders";
import OrderPromotion from "./Components/Promotion/OrderPromotion";
import Promotions from "./Components/Promotion/Promotions";
import FreeShippingPromotion from "./Components/Promotion/FreeShippingPromotion";
import SpecificStorePromotion from "./Components/Promotion/SpecificStorePromotion";
import Categories from "./Components/Categories/Categories";
import Plans from "./Components/Plans/Plans";
import Login from "./Components/Authentication/Login";
import ForgetAccount from "./Components/Authentication/ForgotAccount";
import AuthLayout from "./Components/AuthLayout";
import Otp from "./Components/Authentication/ResetEmail";
import NewPassword from "./Components/Authentication/NewPassword";
import Register from "./Components/Authentication/Register";
import StoreRequests from "./Components/Store/StoreRequests";
import OrderDetailsById from "./Components/Customers/OrderDetailsById";
import Search from "./Components/Search/Search";
import StoreDetailsByEmail from "./Components/Store/StoreDetailsByEmail";
import AllPromoCodes from "./Components/Promotion/AllPromoCodes";

function App() {
  let routes = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <AuthLayout />,
    //   children: [
    //     { index: true, element: <Login /> },
    //     { path: "login", element: <Login /> },
    //     { path: "register", element: <Register /> },
    //     { path: "forgetAccount", element: <ForgetAccount /> },
    //     { path: "resetEmail", element: <Otp /> },
    //     { path: "newpassword", element: <NewPassword /> },
    //   ],
    // },

    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        // store
        { path: "store", element: <Store /> },
        { path: "storerequests", element: <StoreRequests /> },
        { path: "storerequestsdetails", element: <StoreRequestsDetails /> },
        { path: "storesdata", element: <StoresData /> },
        { path: "storedetails", element: <StoreDetails /> },
        { path: "storedetailsbyemail", element: <StoreDetailsByEmail /> },
        { path: "ordershistory", element: <OrdersHistory /> },
        { path: "orderdetails", element: <OrderDetails /> },
        { path: "storesubscription", element: <StoreSubscription /> },
        // orders
        {
          path: "orders",
          element: <Orders />,
          children: [
            { index: true, element: <Navigate to="recentorders" /> },
            { path: "recentorders", element: <RecentOrders /> },
            { path: "recentshippedorders", element: <RecentShippedOrders /> },
            {
              path: "recentreceivedorders",
              element: <RecentReceivedOrders />,
            },
            { path: "refundrequests", element: <RefundRequests /> },
          ],
        },
        // returned items
        {
          path: "returneditems",
          element: <ReturnedItems />,
          children: [
            { index: true, element: <Navigate to="wrongitems" /> },
            { path: "wrongitems", element: <WrongItems /> },
            { path: "changedhismind", element: <ChangedHisMind /> },
            { path: "missingitems", element: <MissingItems /> },
          ],
        },
        { path: "ReturnedWrongItem", element: <ReturnedWrongItem /> },
        { path: "ReturnedMissingItem", element: <ReturnedMissingItem /> },
        { path: "ReturnChangedHisMind", element: <ReturnChangedHisMind /> },
        // customers
        { path: "customers", element: <Customers /> },
        { path: "customersdata", element: <CustomersData /> },
        { path: "customerorders", element: <CustomersOrders /> },
        { path: "orderDetailsById", element: <OrderDetailsById /> },
        // promotion
        {
          path: "promotions",
          element: <Promotions />,
          children: [
            { index: true, element: <Navigate to="orderPromotion" /> },
            { path: "orderPromotion", element: <OrderPromotion /> },
            {
              path: "freeShippingPromotion",
              element: <FreeShippingPromotion />,
            },
            {
              path: "specificStorePromotion",
              element: <SpecificStorePromotion />,
            },
          ],
        },
        { path: "allpromocodes", element: <AllPromoCodes /> },

        // categories
        { path: "categories", element: <Categories /> },
        // plans
        { path: "plans", element: <Plans /> },
        { path: "forgetAccount", element: <ForgetAccount /> },
        // Search
        { path: "search", element: <Search /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
