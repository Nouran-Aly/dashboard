import React from "react";

export default function StoreSubscription() {
  return (
    <div className="stores-data container">
      <div className="mb-5">
        <h3>
          <span> Rouh.Abaya’s</span> Subscriptions
        </h3>
        <p className="text-muted">Check All Subscription Data From Here. </p>
      </div>
      <div className="stores-table white-background p-3 rounded-4">
        <div className="table-responsive">
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">Subscription Package </th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Package Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-bottom py-5">
                <th scope="row">Golden Package </th>
                <td>June 1, 2020, 08:22 AM</td>
                <td>June 1, 2020, 08:22 AM</td>
                <td>450 L.E</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* pagination */}
      <div className="d-flex justify-content-between align-items-center mt-5">
        <p>page 1 out of 10</p>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item ">
              <a class="page-link border-0" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link border-0" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link border-0" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link border-0" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link border-0" href="#">
                4
              </a>
            </li>
            <li class="page-item">
              <a class="page-link border-0" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
