import React from "react";
import { Link, useLocation } from "react-router-dom";
import pink from "../../assets/pink.png";

export default function CustomersData() {
  const location = useLocation();
  const { customer } = location.state || [];
  console.log(customer);

  const formattedDate = (unformattedDate) => {
    const date = new Date(unformattedDate);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="customer-data container h-100 pb-5 ">
        <div className="mb-5">
          <h3>Customers data</h3>
          <p className="text-muted">
            Approve Or Reject Store Registration Requests
          </p>
        </div>
        <div className="store-data white-background py-4 px-5 rounded-4 shadow-sm ">
          <div className="header d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <img src={customer.profilePic} className="rounded-pill" />
              <div className="info">
                <h5>{customer.name}</h5>
                <p className="text-center">{customer.id}</p>
              </div>
            </div>
            <div className="buttons d-flex justify-content-end gap-3">
              <Link to="/customerorders" state={{ customerId: customer.id }}>
                <button className="btn history-btn d-flex justify-content-center align-items-center gap-2 px-4 py-2">
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  Orders History
                </button>
              </Link>
            </div>
          </div>
          <div className="row row-gap-5 my-5">
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">Registration Date</p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {formattedDate(customer.date)}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">User ID </p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {customer.id}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">Phone Number</p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {customer.phoneNumber}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">Email</p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {customer.email}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">Date Of Birth</p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {formattedDate(customer.dateOfBirth)}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">Gender </p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {customer.gender}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">Address Line 1</p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {/* {customer.customerAddress.addressLine1} */}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">Address Line 2</p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {/* {customer.customerAddress.addressLine2} */}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">City</p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {/* {customer.customerAddress.city} */}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">Unit Number</p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {/* {customer.customerAddress.unitNumber} */}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">Street Number</p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {/* {customer.customerAddress.streetNumber} */}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <p className="mb-3 fw-medium fs-5">Nearest Land Mark</p>
                <div className="data-box border py-3 px-4 rounded-3">
                  {/* {customer.customerAddress.nearestLandMark} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
