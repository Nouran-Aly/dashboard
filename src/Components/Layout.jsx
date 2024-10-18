import React from "react";
import {
  CDBNavLink,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  // CDBSidebarSubMenu,
} from "cdbreact";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/1-Nilelon logo.png";
const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        overflow: "scroll initial",
      }}
    >
      <CDBSidebar textColor="#899295" backgroundColor="#ffffff">
        <CDBSidebarHeader prefix={<i className="fa-solid fa-bars"></i>}>
          <Link
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <img src={logo} alt="nilelon logo" />
          </Link>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="nav-item mb-5">
            <NavLink to="/" className="nav-link">
              <CDBSidebarMenuItem
                icon="fa-regular fa-clipboard"
                className="nav-content mb-3 py-1 "
              >
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>

            {/* store */}
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item ">
                <h2 className="accordion-header w-100" id="flush-headingOne">
                  <p
                    className="collapsed w-100"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                  >
                    <NavLink to="store" className="acc-height nav-link">
                      <CDBSidebarMenu className="nav-item p-0">
                        <CDBSidebarMenuItem
                          icon="fa-solid fa-shop"
                          className="nav-content"
                        >
                          <div className="d-flex flex-row justify-content-between align-items-center">
                            <p className="mb-0">Stores</p>
                            <i class="fa-solid fa-chevron-down text-black pe-4 nav-link"></i>
                          </div>
                        </CDBSidebarMenuItem>
                      </CDBSidebarMenu>
                    </NavLink>
                  </p>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body p-0">
                    <NavLink to="/storesdata" className="nav-link">
                      <CDBSidebarMenuItem
                        className="nav-content py-1 "
                        icon="a-solid fa-chevron-right"
                      >
                        Stores Data
                      </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/StoreRequests" className="nav-link">
                      <CDBSidebarMenuItem
                        className="nav-content py-1 "
                        icon="a-solid fa-chevron-right"
                      >
                        Requests
                      </CDBSidebarMenuItem>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <NavLink to="customers" className="nav-link">
              <CDBSidebarMenuItem
                icon="fa-regular fa-user"
                className="nav-content mb-3 py-1 "
              >
                Customers
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/orders" className="nav-link">
              <CDBSidebarMenuItem
                icon="fa-solid fa-cart-shopping"
                className="nav-content mb-3 py-1 "
              >
                Orders
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="promotions" className="nav-link">
              <CDBSidebarMenuItem
                icon="fa-solid fa-percent"
                className="nav-content mb-3 py-1 "
              >
                Promotion
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="categories" className="nav-link">
              <CDBSidebarMenuItem
                icon="fa-solid fa-chart-bar"
                className="nav-content mb-3 py-1 "
              >
                Categories
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="plans" className="nav-link">
              <CDBSidebarMenuItem
                icon="fa-solid fa-note-sticky"
                className="nav-content mb-3 py-1 "
              >
                Plans
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="returneditems" className="nav-link">
              <CDBSidebarMenuItem
                icon="fa-solid fa-arrow-right-arrow-left"
                className="nav-content mb-3 py-1 "
              >
                Returned Orders
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>

      {/* /navbar */}
      <div className="page-body w-100 ">
        <div className="container d-flex flex-column">
          <nav className="navbar w-100 top-0 align-self-start mb-5">
            <div className="container-fluid">
              <a className="navbar-brand fw-bold">Dashboard</a>
              <div className="navbar-content d-flex align-items-center gap-3">
                {/* <form class="d-flex"> */}
                {/* <input
                  class="form-control h-100"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                /> */}
                {/* <button class="btn btn-outline-success" type="submit">
                  Search
                </button> */}
                {/* </form>/ */}
                <Link to="/search">
                  <div className="icon d-grid">
                    <i className="fa-solid fa-magnifying-glass m-auto"></i>
                  </div>
                </Link>

                <div className="icon d-grid">
                  <i className="fa-regular fa-bell m-auto"></i>
                </div>
                <div className="icon d-grid">
                  <i className="fa-regular fa-user m-auto"></i>
                </div>
              </div>
            </div>
          </nav>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
