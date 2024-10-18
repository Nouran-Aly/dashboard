import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function CustomerOrders() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [hasMoreStores, sethasMoreStores] = useState(false);

  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const { customerId } = location.state || [];

  async function getCustomerOrders() {
    return axios
      .get("http://nilelon.somee.com/api/Order/GetCustomerOrders", {
        params: {
          customerId: customerId,
          status: "",
          page: 1,
          pageSize: 8,
        },
      })
      .then((res) => {
        console.log(res.data.result);
        setOrders(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCustomerOrders();
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

  // handle pagination
  const handlePagination = (page) => {
    setCurrentPage(page);
    getAllStores(page, pageSize);
  };

  return (
    <div>
      <div className="stores-data container">
        <div className="mb-5">
          <h3>
            <span>Customer</span> Orders History
          </h3>
          <p className="text-muted">Check All Orders Data From Here.</p>
        </div>
        <div className="stores-table white-background p-3 rounded-4">
          <div className="table-responsive px-5 py-2">
            <table className="table full-table-width">
              <thead className="border-bottom">
                <tr className="text-center">
                  <th scope="col">Order ID</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                  <th scope="col">Total Price</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr className=" py-5 text-center w-100" key={order.id}>
                    <th scope="row">1</th>
                    <td>
                      {order.status === "Delivered" ? (
                        <div className="order-state-recieved d-flex justify-content-center align-items-center gap-1 text-white rounded-4 px-3 ">
                          <i className="fa-regular fa-clock"></i>

                          <p className="mb-0 py-2">Received</p>
                        </div>
                      ) : order.status === "Shipped" ? (
                        <div className="order-state-shipped d-flex justify-content-center align-items-center gap-1 text-white rounded-4 px-3 ">
                          <i className="fa-regular fa-clock"></i>
                          <p className="order-state-shipped mb-0 py-2">
                            Shipped
                          </p>
                        </div>
                      ) : order.status === "Ordered" ? (
                        <div className="order-state-delivered d-flex justify-content-center align-items-center gap-1 text-white rounded-4 px-3 ">
                          <i className="fa-regular fa-clock"></i>
                          <p className="order-state-delivered mb-0 py-2">
                            Ordered
                          </p>
                        </div>
                      ) : null}
                    </td>
                    <td>{formattedDate(order.date)}</td>
                    <td>{order.total}L.E</td>
                    <td>
                      <Link
                        to="/orderDetailsById"
                        state={{ orderId: order.id }}
                      >
                        <div className="store-icon d-grid">
                          <i className="fa-solid fa-arrow-right m-auto"></i>
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* pagination */}
        <div className="d-flex justify-content-between align-items-center mt-5">
          <p>page {currentPage}</p>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item ">
                <Link
                  className="page-link border-0"
                  aria-label="Previous"
                  onClick={() =>
                    currentPage > 1 && handlePagination(currentPage - 1)
                  }
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              <li className="page-item">
                <a className="page-link border-0">{currentPage}</a>
              </li>

              <li className="page-item">
                <Link
                  className="page-link border-0"
                  aria-label="Next"
                  onClick={() =>
                    hasMoreStores && handlePagination(currentPage + 1)
                  }
                >
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
