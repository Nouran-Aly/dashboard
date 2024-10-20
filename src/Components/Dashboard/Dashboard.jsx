import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import pink from "../../assets/pink.png";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import axios from "axios";

export default function Dashboard() {
  const [dashboardStatistics, setDashboardStatistics] = useState([]);
  const [ordersLocations, setOrdersLocations] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [colors, setcolors] = useState([
    "#3A6FF8",
    "#14CC26",
    "#FFBE17",
    "#FF613E",
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // date picker
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  // handle Amin dashoboard statisctics
  async function getAdminDashboardStatistics() {
    return await axios
      .get(
        "http://nilelon.somee.com/api/AdminDashboard/GetAdminDashboardStatistics"
      )
      .then((res) => {
        setDashboardStatistics(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // handle Orders Locations
  async function getMostOrdersLocation() {
    return await axios
      .get("http://nilelon.somee.com/api/AdminDashboard/GetMostOrdersLocation")
      .then((res) => {
        setOrdersLocations(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // handle Top ordered products
  async function getTopOrderedProducts() {
    return await axios
      .get("http://nilelon.somee.com/api/AdminDashboard/GetTopOrderedProducts")
      .then((res) => {
        console.log("toppp", res.data.result);

        setTopProducts(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getAdminDashboardStatistics();
    getMostOrdersLocation();
    getTopOrderedProducts();
  }, []);

  return (
    <div className="dashboard container h-100">
      <div className="row row-gap-4">
        <div className="col-md-6 d-flex flex-column flex-md-row flex-wrap ">
          <div className="d-flex w-100 gap-3">
            {/* first card */}
            <div className="card border-0 d-flex flex-column gap-3 p-3 shadow-md rounded-4 w-50">
              <div className="card-icon income d-grid position-relative">
                <i className="fa-solid fa-dollar-sign m-auto"></i>
              </div>
              <div
                className="position-absolute end-0 pe-4"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
              <p className="card-title">Total Income</p>
              <div className="d-flex gap-2 gap-lg-5">
                <div className="card-bold-num fw-bold fs-3">
                  {dashboardStatistics.totalIncome}
                </div>
              </div>
            </div>

            {/* second card */}
            <div className="card border-0 d-flex flex-column gap-3 p-3 shadow-md rounded-4 w-50">
              <div className="card-icon orders d-grid position-relative">
                <i className="fa-solid fa-cart-plus m-auto"></i>
              </div>
              <div
                className="position-absolute end-0 pe-4"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
              <p className="card-title">Total Recieved orders</p>
              <div className="d-flex gap-2 gap-lg-5">
                <div className="card-bold-num fw-bold fs-3">
                  {dashboardStatistics.totalRecivedOrders}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex w-100 gap-3 mt-3">
            {/* third card */}
            <div className="card border-0 d-flex flex-column gap-3 p-3 shadow-md rounded-4 w-50">
              <div className="card-icon followers d-grid position-relative">
                <i className="fa-solid fa-users m-auto"></i>
              </div>
              <div
                className="position-absolute end-0 pe-4"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
              <p className="card-title">Active Followers</p>
              <div className="d-flex gap-2 gap-lg-5">
                <div className="card-bold-num fw-bold fs-3">
                  {dashboardStatistics.numberActiceFollowers}
                </div>
              </div>
            </div>

            {/* fourth card */}
            <div className="card border-0 d-flex flex-column gap-3 p-3 shadow-md rounded-4 w-50">
              <div className="card-icon stores d-grid position-relative">
                <i className="fa-solid fa-store m-auto"></i>
              </div>
              <div
                className="position-absolute end-0 pe-4"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
              <p className="card-title">Active Stores</p>
              <div className="d-flex gap-2 gap-lg-5">
                <div className="card-bold-num fw-bold fs-3">
                  {dashboardStatistics.numberActiceStores}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 white-background rounded-4 px-4 py-3 h-100">
          <div className="position-relative border-0 pt-3 mb-3">
            <h4>Orders Locations</h4>
            <div
              className="position-absolute top-50 end-0 translate-middle-x fs-5"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-5">
            <div className="d-flex flex-column justify-content-between align-items-center w-50">
              <ul className="locations d-flex flex-row flex-md-column h-100 align-content-center justify-content-center gap-5 gap-md-3 py-2 w-100">
                {ordersLocations?.map((location, index) => (
                  <li key={location.governate}>
                    <div
                      className="before"
                      style={{
                        backgroundColor: colors[index % colors.length],
                      }}
                    ></div>
                    <p className="m-0">{location.governate}</p>
                    <p className="location-percentage m-0">
                      {location.orderCount}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="align-self-center">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
      {/* ########################################### */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 w-100 h-100 my-4">
        <div className="custom-box white-background rounded-4 p-3 w-100">
          <div className=" d-flex justify-content-between mb-3">
            <h4>Recieved Orders</h4>
            {/* pick date */}
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Pick Time Range
            </button>
            {/* modal */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex justify-content-center align-items-center">
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => {
                          setState([item.selection]);
                          setStartDate(item.selection.startDate);
                          setEndDate(item.selection.endDate);
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100">
            <LineChart startDate={startDate} endDate={endDate} />
          </div>
        </div>

        <div className="custom-box white-background rounded-4 p-3 w-100">
          <div className="d-flex justify-content-between mb-3">
            <h4>Top Stores</h4>
            {/* pick date */}
            {/* <button
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Pick Time Range
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex justify-content-center align-items-center">
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="w-100">
            <BarChart />
          </div>
        </div>
      </div>

      <div className="white-background rounded-4 px-5 py-3 mb-5">
        <div className=" d-flex justify-content-between py-4 px-3">
          <h4 className="">Top Ordered Products</h4>
          {/* pick date */}
          {/* <button
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Pick Time Range
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-center align-items-center">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setState([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="row row-gap-3">
          {topProducts?.map((product) => (
            <div className="col-12 col-md-6" key={product.productId}>
              <div className="ordered-product-card card border-0 p-3 w-100">
                <div className="d-flex gap-4 align-items-center h-100">
                  <img src={pink} className="rounded-4 h-100" />
                  <div className="order-details d-flex flex-column gap-2">
                    <p className="fw-medium fs-5 mb-0">{product.name}</p>
                    <div className="d-flex justify-content-between align-items-center gap-2">
                      <p className="m-0 ">Store Name</p>
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-star text-warning me-1"></i>
                        <p className="rate m-0">3.4</p>
                      </div>
                    </div>
                    <p>
                      # of items sold:
                      <span className="sold-items">{product.orderCount}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
