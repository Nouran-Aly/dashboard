import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
export default function Promotions() {
  return (
    <div className="promotions container">
      <div className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="">
            <h3>Promotions </h3>
            <p className="text-muted">You Can Create Promo codes from Here.</p>
          </div>
          <Link
            className="btn btn-outline-dark rounded-pill py-2 px-4"
            to="/allpromocodes"
          >
            All Promo Codes
          </Link>
        </div>
      </div>

      <div className="white-background py-4 px-5 rounded-4 mb-4">
        <div className="custom-header white-background d-flex flex-column flex-md-row align-items-center gap-3 gap-md-0 my-4 px-1 w-100 h-100 mb-5">
          <NavLink
            activeClassName="active"
            className=" custom-nav-link w-75 text-center"
            to="orderPromotion"
          >
            Orders
          </NavLink>

          <NavLink
            activeClassName="active"
            className="custom-nav-link w-75 text-center"
            to="freeShippingPromotion"
          >
            Free Shipping
          </NavLink>

          <NavLink
            activeClassName="active"
            className="custom-nav-link w-75 text-center"
            to="specificStorePromotion"
          >
            Specific Store
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
