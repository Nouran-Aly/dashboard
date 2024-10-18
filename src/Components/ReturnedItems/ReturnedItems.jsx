import React, { useEffect, useState } from "react";
import BarChart from "../Dashboard/BarChart";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import ReturnsChart from "./ReturnsChart";

export default function ReturnedItems() {
  const [returnedOrders, setreturnedOrders] = useState([]);

  async function getReturnsData() {
    return await axios
      .get(
        "http://nilelon.somee.com/api/AdminReturnedOrder/GetTotalReturnedOrders"
      )
      .then((res) => {
        setreturnedOrders(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getReturnsData();
  }, []);

  return (
    <div>
      <div className="dashboard container h-100">
        <div className="row row-gap-4">
          <div className="col-md-6 d-flex flex-column flex-md-row flex-wrap ">
            <div className="d-flex w-100 gap-3">
              {/* first card */}
              <div className="card border-0 d-flex justify-content-center align-items-center flex-column gap-3 p-3 shadow-md rounded-4 w-50">
                <p className="card-title">Total # Of Returned Items </p>
                <div className="card-bold-num fw-bold fs-3 text-primary">
                  {returnedOrders.returnedVariants}
                </div>
              </div>

              {/* second card */}
              <div className="card border-0 d-flex justify-content-center align-items-center flex-column gap-3 p-3 shadow-md rounded-4 w-50">
                <p className="card-title">Total # Of Changed His Mind</p>
                <div className="card-bold-num fw-bold fs-3 text-warning">
                  {returnedOrders.returnedChangedMindItem}
                </div>
              </div>
            </div>

            <div className="d-flex w-100 gap-3 mt-3">
              {/* third card */}
              <div className="card border-0 d-flex justify-content-center align-items-center flex-column gap-3 p-3 shadow-md rounded-4 w-50">
                <p className="card-title">Total # Of Wrong Items </p>
                <div className="card-bold-num fw-bold fs-3 text-success">
                  {returnedOrders.returnedWrongItem}
                </div>
              </div>

              {/* fourth card */}
              <div className="card border-0 d-flex justify-content-center align-items-center flex-column gap-3 p-3 shadow-md rounded-4 w-50">
                <p className="card-title">Total # Of Missing Items </p>
                <div className="card-bold-num fw-bold fs-3 text-info">
                  {returnedOrders.returnedMissingItem}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 white-background rounded-4 px-4 py-3 h-100">
            <div className="position-relative border-0 pt-3 mb-4">
              <h5>Stores That Has Most Returned Items</h5>
              <div
                className="position-absolute top-50 end-0 translate-middle-x fs-5"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>

            <div className="chart">
              <ReturnsChart />
            </div>
          </div>
        </div>
        <div className="custom-header white-background d-flex align-items-center my-4 px-1">
          <NavLink
            // activeClassName="active"
            className=" custom-nav-link w-75 text-center"
            to="wrongitems"
          >
            Wrong Items
          </NavLink>

          <NavLink
            // activeClassName="active"
            className="custom-nav-link w-75 text-center"
            to="changedhismind"
          >
            Changed His Mind
          </NavLink>

          <NavLink
            // activeClassName="active"
            className="custom-nav-link w-75 text-center"
            to="missingitems"
          >
            Missing Items
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
