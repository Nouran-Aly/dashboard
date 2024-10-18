import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [hasMoreStores, sethasMoreStores] = useState(true);

  async function searchAPi(text, page = 1, pageSize = 8) {
    return await axios
      .post(
        "http://nilelon.somee.com/api/AdminSearch/AdminSearch",
        {},
        {
          params: {
            searchTxt: text,
            page: page,
            pageSize: pageSize,
          },
        }
      )
      .then((res) => {
        console.log(res.data.result);
        const fetchedData = res.data.result;

        setSearchResult(res.data.result);
        // handle pagination
        if (fetchedData.length < pageSize) {
          sethasMoreStores(false);
        } else {
          sethasMoreStores(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    const text = e.target.value;
    setSearchText(text);
    searchAPi(text);
  };

  useEffect(() => {
    handleSearchChange;
  }, [searchText]);

  // handle pagination
  const handlePagination = (page) => {
    setCurrentPage(page);
    searchAPi(searchText, page, pageSize);
  };

  return (
    <>
      <div className="stores-data container">
        <div className="mb-4 p-3 white-background rounded-4">
          <div className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search By Store Or Customer Name"
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
              <thead className="border-bottom ">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Email</th>
                  <th scope="col">Type</th>
                  {/* <th scope="col"></th> */}
                </tr>
              </thead>
              <tbody>
                {searchResult?.map((data) => (
                  <tr className="py-5" key={data.id}>
                    <th scope="row">{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.phoneNumber}</td>
                    <td>{data.email}</td>
                    {data.type === "Store" ? (
                      <td className="bg-danger px-4 text-white">{data.type}</td>
                    ) : (
                      <td className="bg-warning px-4 text-white">
                        {data.type}
                      </td>
                    )}

                    {/* {data.type === "Store" ? (
                      <td>
                        <Link to="/store" state={{ data }}>
                          <div className="store-icon d-grid">
                            <i className="fa-solid fa-arrow-right m-auto"></i>
                          </div>
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <Link to="/storedetails" state={{ data }}>
                          <div className="store-icon d-grid">
                            <i className="fa-solid fa-arrow-right m-auto"></i>
                          </div>
                        </Link>
                      </td>
                    )} */}
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
    </>
  );
}
