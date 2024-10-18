import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function StoreDetailsByEmail() {
  const [store, setStore] = useState(null);
  const location = useLocation();
  const { email } = location.state || [];
  console.log(email, "from store details");

  async function getStoreByEmail() {
    return await axios
      .get("http://nilelon.somee.com/api/Store/GetStoreByEmail", {
        params: {
          email: email,
        },
      })
      .then((res) => {
        console.log(res.data.result);
        setStore(res.data.result);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  useEffect(() => {
    getStoreByEmail();
  }, [email]);

  if (!store) {
    // Loading or no data yet
    return <div>Loading...</div>;
  }
  return (
    <div className="store-details container h-100 pb-5 shad">
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
              <p className="text-center">#{store.id}</p>
            </div>
          </div>
          <Link to="/ordershistory" state={{ storeId: store.id }}>
            <button className="btn history-btn d-flex justify-content-center align-items-center gap-2 px-3">
              <i className="fa-solid fa-clock-rotate-left"></i>
              Orders History
            </button>
          </Link>
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

        <div className="buttons d-flex justify-content-end gap-3">
          <Link to="/storesubscription">
            <button className="btn subscription-btn d-flex justify-content-center align-items-center gap-2 px-3">
              <i className="fa-solid fa-crown"></i>Subscription
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
