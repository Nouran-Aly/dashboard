import pink from "../../assets/pink.png";
import { useFormik } from "formik";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function StoreRequestsDetails() {
  const [userMsg, setUserMsg] = useState("");
  const location = useLocation();
  const { store } = location.state || [];
  console.log(store, "from store details");

  // accept stores
  async function activateStore(storeId, state) {
    return await axios
      .post(
        "http://nilelon.somee.com/api/AdminDataManagement/ActivateStore",
        {},
        {
          params: {
            storeId: storeId,
            status: state,
          },
        }
      )
      .then((res) => {
        console.log(res.data.result);
        setUserMsg(res.data.result);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div className="container h-100 pb-5 shad">
      <div className="mb-5">
        <h3>Registeration Data</h3>
        <p className="text-muted">
          Approve Or Reject Store Registration Requests
        </p>
      </div>
      <div className="store-data white-background py-4 px-5 rounded-4 shadow-sm">
        <div className="header d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <img src={store.profilePic} alt="" className="rounded-pill" />
            <div className="info">
              <h5>{store.name}</h5>
              <p className="text-center">{store.id}</p>
            </div>
          </div>
          <div className="buttons d-flex align-items-center gap-3">
            {userMsg ? (
              <button className="btn btn-success py-2 px-5" disabled>
                {userMsg}
              </button>
            ) : (
              <>
                <button
                  className="btn btn-success py-2 px-5"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Accept
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header border-0">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body text-center py-5 fw-medium fs-2">
                        Activate Store ?
                      </div>
                      <div className="modal-footer border-0">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => activateStore(store.id, "Active")}
                          data-bs-dismiss="modal"
                        >
                          Activate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* <button
              className="btn btn-danger py-2 px-5"
              data-bs-toggle="modal"
              data-bs-target="#rejectModal"
            >
              Reject
            </button> */}
            <div
              className="modal fade"
              id="rejectModal"
              tabIndex={-1}
              aria-labelledby="rejectModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header border-0">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body text-center py-5 fw-medium fs-2">
                    Suspend Store ?
                  </div>
                  <div className="modal-footer border-0">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => activateStore(store.id, "Suspend")}
                      data-bs-dismiss="modal"
                    >
                      Suspend
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row row-gap-5 my-5">
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Registration Date</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {store.date}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Email</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {store.email}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Phone Number</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {store.phoneNumber}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Warehouse Address</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {store.warehouseAddress}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Store Representitve Name</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {store.repName}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">
                Store Representitve Phone Number
              </p>
              <div className="data-box border py-3 px-4 rounded-3">
                {store.repPhone}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Profile Link</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {store.profileLink}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Website Link</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {store.webSiteLink}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
