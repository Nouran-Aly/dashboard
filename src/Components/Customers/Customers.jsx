import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  // search
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [hasMoreStores, sethasMoreStores] = useState(true);

  async function searchAPi(text) {
    return await axios
      .post(
        "http://nilelon.somee.com/api/AdminSearch/AdminSearch",
        {},
        {
          params: {
            searchTxt: text,
            page: 1,
            pageSize: 8,
          },
        }
      )
      .then((res) => {
        console.log(res.data.result, "SEARCH RESULT");
        setSearchResult(res.data.result);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    const text = e.target.value;
    setSearchText(text);
    searchAPi(searchText);
  };

  useEffect(() => {
    // handleSearchChange;
    if (searchText === "") {
      getAllCustomers();
    }
  }, [searchText]);

  async function getAllCustomers(page = 1, pageSize = 8) {
    return axios
      .get("http://nilelon.somee.com/api/AdminDataManagement/GetAllCustomers", {
        params: {
          page: page,
          pageSize: pageSize,
        },
      })
      .then((res) => {
        console.log(res.data.result);
        const fetchedData = res.data.result;
        setCustomers(res.data.result);

        // handle pagination
        if (fetchedData.length < pageSize) {
          sethasMoreStores(false);
        } else {
          sethasMoreStores(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllCustomers();
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
    getAllCustomers(page, pageSize);
  };

  return (
    <div className="customers container">
      <div className="mb-4 p-3 white-background rounded-4">
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search By Customer Name "
            aria-label="Search"
            onChange={handleSearchChange}
          />
          <button
            className="btn btn-outline-success"
            onClick={handleSearchChange}
          >
            Search
          </button>
        </div>
      </div>

      <div className="stores-table white-background p-3 rounded-4">
        <div className="table-responsive px-5 py-2">
          <table className="table text-center">
            <thead className="border-bottom pb-5">
              <tr>
                <th scope="col">Customer ID</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Date</th>
                <th scope="col">Phone Number</th>
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>
              {searchResult.length > 0 ? (
                <>
                  {searchResult?.map((data) => (
                    <tr className="py-5" key={data.id}>
                      <th scope="row">{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.phoneNumber}</td>
                      <td>{data.email}</td>
                      <td>
                        <Link
                          to="/storedetailsbyemail"
                          state={{ email: data.email }}
                        >
                          <div className="store-icon d-grid">
                            <i className="fa-solid fa-arrow-right m-auto"></i>
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {customers?.map((customer) => (
                    <tr className="py-5" key={customer.id}>
                      <th scope="row">{customer.id}</th>
                      <td>{customer.name}</td>
                      <td>{formattedDate(customer.date)}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>
                        <Link to="/customersdata" state={{ customer }}>
                          <div className="store-icon d-grid">
                            <i className="fa-solid fa-arrow-right m-auto"></i>
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </>
              )}
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
              <p className="page-link border-0" href="#">
                {currentPage}
              </p>
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
  );
}
