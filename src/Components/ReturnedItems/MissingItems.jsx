import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MissingItems() {
  const [items, setItems] = useState([]);

  async function getMissingItems() {
    return await axios
      .get("http://nilelon.somee.com/api/AdminReturnedOrder/GetAllMissingItems")
      .then((res) => {
        console.log(res.data.result);
        setItems(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getMissingItems();
  }, []);

  return (
    <div className="stores-table white-background p-3 rounded-4 w-100 mb-5">
      <div className="table-responsive px-5 py-2">
        <table className="table text-center W-100">
          <thead className="border-bottom">
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Return Date</th>
              <th scope="col">Return ID</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr className="py-5">
                <th scope="row">{item.orderId}</th>
                <td>{item.date}</td>
                <td>{item.returnedId}</td>
                <td>
                  <Link
                    to="/ReturnedMissingItem"
                    state={{ returnedId: item.returnedId }}
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
  );
}
