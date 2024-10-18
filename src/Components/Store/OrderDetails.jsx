import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import pink from "../../assets/tshirt.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../swiper.css";
import { Pagination } from "swiper/modules";

export default function OrderDetails() {
  const [details, setDetails] = useState([]);
  const location = useLocation();
  const { orderId, storeId } = location.state || [];

  async function getOrdereDetails() {
    return axios
      .get("http://nilelon.somee.com/api/Order/GetStoreOrderDetails", {
        params: {
          orderId: orderId,
          storeId: storeId,
        },
      })
      .then((res) => {
        console.log(res.data.result, "ORDER DETAILS");
        setDetails(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getOrdereDetails();
  }, []);

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

  const trimColor = (color) => {
    console.log("COLOR", "#" + color.slice(2));
    return "#" + color.slice(2);
  };

  return (
    <div className="order-detail container mb-5">
      <div className="mb-5">
        <h3>Orders History</h3>
        <p className="text-muted">Check All Orders Data From Here.</p>
      </div>
      <div className="order-details white-background py-4 px-5 rounded-4 shadow-sm">
        <div className="row row-gap-5">
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Order ID</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {/* {details.id} */}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Order Date </p>
              <div className="data-box border py-3 px-4 rounded-3">
                {formattedDate(details.date)}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Total Price</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.total} L.E
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Discount</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.discount}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Promo Code Name </p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.promoCodeName}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Governate </p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.governate}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Status </p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.status}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Phone Number </p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.phoneNumber}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Customer ID </p>
              <div className="data-box border py-3 px-4 rounded-3">#345678</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Address </p>
              <div className="data-box border py-3 px-4 rounded-3">
                Nasr City, Cairo
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Shipping Cost</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {details.shippingCost}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <p className="mb-3 fw-medium fs-5">Payment Method</p>
              <div className="data-box border py-3 px-4 rounded-3">
                {/* Cash On Delivery */}
              </div>
            </div>
          </div>
        </div>
        <div className="row row-gap-4 mt-5">
          {details?.orderProductVariants?.map((order) => (
            <div className="col-md-6" key={orderId}>
              <div className="card p-4 border rounded-3 h-100">
                <div className="d-flex flex-column gap-md-4 gap-3">
                  <div className="card-title d-flex flex-column flex-lg-row gap-3">
                    <Swiper
                      spaceBetween={10}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className="mySwiper"
                    >
                      {order?.urls?.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img src={image} className="rounded-4 " />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div className="d-flex flex-column justify-content-between gap-2">
                      <p className="mb-0 fw-medium fs-5">{order.productName}</p>
                      <div className="d-flex justify-content-between align-items-md-center gap-3">
                        <p className="mb-0 text-muted">{order.storeName}</p>
                        <div className="d-flex align-items-center gap-1">
                          <i className="fa-solid fa-star text-warning"></i>
                          <p className="mb-0">{order.productRate}</p>
                        </div>
                      </div>
                      <p className="price fw-medium mb-0">{order.price} LE</p>
                    </div>
                  </div>
                  <div className="body">
                    <div className="d-flex flex-wrap  justify-content-between gap-2">
                      <p className="mb-0 text-muted fw-medium">
                        Product ID: <span>{order.productId}</span>
                      </p>
                      <p className="mb-0 text-muted fw-medium">
                        Store ID: <span>{order.storeId} </span>
                      </p>
                    </div>
                  </div>
                  <div className="footer border-0 bg-body mt-2 mt-md-0">
                    <div className="d-flex flex-wrap justify-content-between align-items-md-center gap-4">
                      <div className="size d-flex align-items-center gap">
                        <p className="mb-0 text-muted">Size :</p>
                        <div className="size-box">{order.size}</div>
                      </div>
                      <div className="quan d-flex align-items-center gap-2">
                        <p className="mb-0 text-muted">Quan :</p>
                        <div className="quan-box fw-bold">{order.quantity}</div>
                      </div>
                      <div className="color d-flex align-items-center gap-2">
                        <p className="mb-0 text-muted">color :</p>
                        <div
                          className="product-color"
                          style={{ backgroundColor: trimColor(order.color) }}
                        ></div>
                      </div>
                    </div>
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
