import React from "react";
import silver from "../../assets/silver/Background-copy.png";
import gold from "../../assets/gold/Background-copy-4.png";
import platinum from "../../assets/platinum/Background-copy-3.png";

export default function Plans() {
  return (
    <div className="subscription-page mb-5">
      <div className="container subscription bg-white p-5 rounded-5 d-flex flex-column justify-content-center align-items-center gap-5">
        <h3 className="text-center">Subscription Packages</h3>
        <div className="row w-100 row-gap-5">
          <div className="col-md-4">
            <div className="card silver-card rounded-5 overflow-hidden d-flex flex-column justify-content-around gap-3 border-0">
              <div className="header-img d-flex justify-content-center">
                <img src={silver} className="mt-5 z-2" />
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center gap-2 h-100 ">
                <h3 className="fw-bold">SILVER</h3>
                <p className="mb-0">3 month</p>
                <p>5000 LE</p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p className="bg-body-secondary subscription-btn mb-5 p-3 rounded-pill">
                  Subscriped Stores : <span>100</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card gold-card rounded-5 overflow-hidden d-flex flex-column justify-content-around gap-3 border-0">
              <div className="header-img d-flex justify-content-center">
                <img src={gold} className="mt-5 z-2" />
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center gap-2 h-100 ">
                <h3 className="fw-bold">GOLD</h3>
                <p className="mb-0">3 month</p>
                <p>5000 LE</p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p className="bg-body-secondary subscription-btn mb-5 p-3 rounded-pill">
                  Subscriped Stores : <span>100</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card platinum-card rounded-5 overflow-hidden d-flex flex-column justify-content-around gap-3 border-0">
              <div className="header-img d-flex justify-content-center">
                <img src={platinum} className="mt-5 z-2" />
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center gap-2 h-100 ">
                <h3 className="fw-bold">PLATINUM</h3>
                <p className="mb-0">3 month</p>
                <p>5000 LE</p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p className="bg-body-secondary subscription-btn mb-5 p-3 rounded-pill">
                  Subscriped Stores : <span>100</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
