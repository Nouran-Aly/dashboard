import pink from "../../assets/pink.png";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ReturnedMissingItem() {
  // const [details, setDetails] = useState([]);

  const details = {
    images: ["string"],
    storeName: "nilelon",
    storeId: "4sdandk",
    customerId: "123sdxsmclks",
    price: 0,
    orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    size: "M",
    color: "#FF5588",
    date: "2024-10-01T22:14:57.587Z",
    reason: "Misisng",
    frontImage: "string",
    backImage: "string",
  };

  const location = useLocation();
  const { returnedId } = location.state || "";
  console.log(returnedId);

  async function getReturnedChangedMindItemDetails() {
    return await axios
      .get(
        "http://nilelon.somee.com/api/AdminReturnedOrder/GetReturnedChangedMindItemDetails",
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
    getReturnedChangedMindItemDetails();
  }, []);
  return (
    <div className="returned-items container mb-5">
      <div className="order-details white-background py-4 px-5 rounded-4 shadow-sm py-5">
        <div className="order-info mb-5">
          <div className="row row-gap-4">
            <div className="col-md-2">
              <img src={details.images[0]} className="w-100 rounded-4" alt="" />
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
                      style={{ backgroundColor: details.color }}
                    >
                      <span></span>
                    </div>
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
        </div>
      </div>
    </div>
  );
}
