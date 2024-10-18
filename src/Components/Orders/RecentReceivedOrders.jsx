import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecentReceivedOrders() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreOrders, setHasMoreOrders] = useState(false);
  const [pageSize, setPageSize] = useState(8);

  async function getRecentOrders(page = 1, pageSize = 8) {
    return await axios
      .get(
        "http://nilelon.somee.com/api/AdminOrderManagement/GetRecentOrders",
        {
          params: {
            status: "Delivered",
            page: page,
            pageSize: pageSize,
          },
        }
      )
      .then((res) => {
        console.log(res.data.result);
        const data = res.data.result;
        setRecentOrders(res.data.result);
        if (data > 8) {
          setHasMoreOrders(true);
        } else {
          setHasMoreOrders(false);
        }
      })

      .catch((error) => {
        console.log(error.response.data);
      });
  }

  useEffect(() => {
    getRecentOrders();
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

  // handlePagination
  const handlePagination = (page) => {
    setCurrentPage(page);
    getRecentOrders(page, pageSize);
  };

  return (
    <>
      <div className="stores-table white-background p-3 rounded-4 w-100">
        <div className="table-responsive px-5 py-2">
          <table class="table text-center">
            <thead className="border-bottom">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Governate</th>
                <th scope="col">Date</th>
                <th scope="col">Total Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders?.map((order) => (
                <tr className="py-5" key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td>{order.governate}</td>
                  <td>{formattedDate(order.date)}</td>
                  <td>{order.total}</td>
                  <td>
                    <Link to="/orderDetailsById" state={{ orderId: order.id }}>
                      <div className="store-icon d-grid">
                        <i class="fa-solid fa-arrow-right m-auto"></i>
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
          <ul class="pagination">
            <li class="page-item ">
              <Link
                class="page-link border-0"
                aria-label="Previous"
                onClick={() =>
                  currentPage > 1 && handlePagination(currentPage - 1)
                }
              >
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            <li class="page-item">
              <p class="page-link border-0">1</p>
            </li>

            <li class="page-item">
              <Link
                class="page-link border-0"
                aria-label="Next"
                onClick={() =>
                  hasMoreOrders && handlePagination(currentPage + 1)
                }
              >
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
