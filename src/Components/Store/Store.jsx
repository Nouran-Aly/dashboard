import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Store() {
  const [stores, setStores] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [hasMoreStores, sethasMoreStores] = useState(true);

  async function getAllStores(page = 1, pageSize = 8) {
    return axios
      .get("http://nilelon.somee.com/api/AdminDataManagement/GetAllStores", {
        params: {
          status: "",
          page: page,
          pageSize: pageSize,
        },
      })
      .then((res) => {
        console.log(res.data.result, "STORES DATA");
        const fetchedData = res.data.result;
        setStores(res.data.result);

        // handle pagination
        if (fetchedData.length <= pageSize) {
          sethasMoreStores(false);
        } else {
          sethasMoreStores(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllStores();
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
    <>
      <div className="stores container h-100 pb-5">
        <div className="header d-flex justify-content-between align-items-center">
          <div>
            <h3>Registeration Data</h3>
            <p>Approve Or Reject Store Registration Requests</p>
          </div>
        </div>

        <div className="stores-table white-background p-3 rounded-4 w-100">
          <div className="table-responsive px-5 py-2">
            <table className="table text-center">
              <thead className="border-bottom">
                <tr>
                  <th scope="col">Store ID</th>
                  <th scope="col">Store Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {stores?.map((store) => (
                  <tr className=" py-5">
                    <th scope="row">{store.id}</th>
                    <td>{store.name}</td>
                    <td>{formattedDate(store.date)}</td>
                    <td>{store.email}</td>
                    <td>
                      <Link to="/storedetails" state={{ store }}>
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
                <button
                  className="page-link border-0"
                  aria-label="Previous"
                  onClick={() =>
                    currentPage > 1 && handlePagination(currentPage - 1)
                  }
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>

              <li className="page-item">
                <p className="page-link border-0">{currentPage}</p>
              </li>

              <li className="page-item">
                <button
                  className="page-link border-0"
                  aria-label="Next"
                  onClick={() =>
                    hasMoreStores && handlePagination(currentPage + 1)
                  }
                  disabled={!hasMoreStores}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
