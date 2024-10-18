import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WrongItems() {
  const [items, setItems] = useState([]);
  async function getWrongItems() {
    return await axios
      .get("http://nilelon.somee.com/api/AdminReturnedOrder/GetAllWrongItems")
      .then((res) => {
        console.log(res.data.result);
        setItems(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getWrongItems();
  }, []);

  return (
    <div className="stores-table white-background p-3 rounded-4 w-100 mb-5">
      <div className="table-responsive rounded-4">
        <table className="table text-center W-100">
          <thead className="border-bottom ">
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
                    to="/ReturnedWrongItem"
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
