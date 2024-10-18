import React, { useEffect, useState } from "react";
import pink from "../../assets/pink.png";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ReturnedWrongItem() {
  const [details, setDetails] = useState([]);

  const location = useLocation();
  const { returnedId } = location.state || "";
  // console.log(returnedId);

  async function getReturnedWrongItemDetails() {
    return await axios
      .get(
        "http://nilelon.somee.com/api/AdminReturnedOrder/GetReturnedWrongItemDetails",
        {
          params: {
            returnId: returnedId,
          },
        }
      )
      .then((res) => {
        console.log(res.data.result);
        setDetails(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getReturnedWrongItemDetails();
  }, []);

  // handle color
  const trimColor = (color) => {
    console.log("COLOR", "#" + color.slice(2));
    return "#" + color.slice(2);
  };

  return (
    <div className="returned-items container mb-5">
      <div className="order-details white-background py-4 px-5 rounded-4 shadow-sm py-5">
        <div className="order-info mb-5">
          <div className="row row-gap-4">
            <div className="col-md-2">
              <img src={details} className="w-100 rounded-4" alt="" />
            </div>
            <div className="col-md-9">
              <div className="d-flex flex-column justify-content-center w-100 h-100">
                <div className="d-flex justify-content-between">
                  <h5>T-shirt</h5>
                  <p className="price">{details.price}</p>
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-md-center gap-4">
                  <div className="size d-flex align-items-center gap">
                    <p className="mb-0 text-muted">Size :</p>
                    <div className="size-box">{details.size}</div>
                  </div>
                  <div className="quan d-flex align-items-center gap-2">
                    <p className="mb-0 text-muted">Quan :</p>
                    <div className="quan-box fw-bold">1</div>
                  </div>
                  <div className="color d-flex align-items-center gap-2">
                    <p className="mb-0 text-muted">color :</p>
                    <div
                      className="product-color"
                      // style={{ backgroundColor: trimColor(details.color) }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row row-gap-5">
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Returned Date</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.date}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Reason </p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.reason}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Received Color </p>
              <div
                className="product-color  p-3"
                // style={{ backgroundColor: trim Color(details.returnedColor) }}
              ></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Received Size</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.returnedSize}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Order ID</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.orderId}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Customer ID</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.customerId}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Store Name </p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.storeName}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Store ID </p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.storeId}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">product ID </p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.productId}
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <p className="mb-3 fw-medium fs-5">Uploaded Photos </p>
            <div className="row">
              <div className="col-md-3">
                <img src={details.frontImage} className="w-100 rounded-4" />
                <p className="text-center mt-2 fw-medium">Front</p>
              </div>
              <div className="col-md-3">
                <img src={details.backImage} className="w-100 rounded-4" />
                <p className="text-center mt-2 fw-medium">Back</p>
              </div>
              <div className="col-md-3">
                <img src={details.damageImage} className="w-100 rounded-4" />
                <p className="text-center mt-2 fw-medium">Damaged Part</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
