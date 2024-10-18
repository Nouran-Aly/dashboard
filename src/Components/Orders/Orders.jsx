import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Orders() {
  return (
    <div className="stores-data container">
      <div className="mb-4 p-3 white-background rounded-4">
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search By Order"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="custom-header white-background d-flex flex-column flex-md-row align-items-center mb-4 px-1 w-100 h-100 gap-3 gap-md-0">
        <NavLink
          activeClassName="active"
          className="custom-nav-link text-center w-100"
          to="recentorders"
        >
          Recent Orders
        </NavLink>

        <NavLink
          activeClassName="active"
          className="custom-nav-link text-center w-100"
          to="recentshippedorders"
        >
          Recent Shipped Orders
        </NavLink>

        <NavLink
          activeClassName="active"
          className="custom-nav-link text-center w-100"
          to="recentreceivedorders"
        >
          Recent Received Orders
        </NavLink>

        <NavLink
          activeClassName="active"
          className="custom-nav-link text-center w-100 btn"
          to="/returneditems"
        >
          Refund Requests
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
