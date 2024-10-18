import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function SpecificStorePromotion() {
  const [stores, setStores] = useState([]);
  const [userMsg, setUserMsg] = useState("");
  const [userError, setUserError] = useState("");

  let mySchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    code: Yup.string().required("Code is required"),
    discountAmount: Yup.number()
      .required("Discount Amount is required")
      .positive("Discount Amount must be a positive number")
      .min(0.1, "Discount Amount must be at least 0.1")
      .max(0.99, "Discount Amount cannot exceed 1"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      code: "",
      discountAmount: 0,
      storeId: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      console.log(values);
      createPromoCode(values);
    },
  });

  async function createPromoCode(values) {
    return await axios
      .post(
        "http://nilelon.somee.com/api/Promotion/CreateOrderPromoCode",
        values
      )
      .then((res) => {
        setUserMsg(res.data.result);
      })
      .catch((error) => {
        console.log(error.response);

        setUserError(error.response.statusText);
      });
  }

  async function getStores() {
    return await axios
      .get("http://nilelon.somee.com/api/AdminDataManagement/GetAllStores", {
        params: {
          status: "",
          page: 1,
          pageSize: 10000,
        },
      })
      .then((res) => {
        console.log(res.data.result);
        setStores(res.data.result);
      })
      .catch((error) => {
        console.log(error.response.statusText);
      });
  }

  useEffect(() => {
    getStores();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="my-3">
      <div className="row row-gap-4">
        {/* Code Name */}
        <div className="col-md-6">
          <label htmlFor="code" className="mb-3 fw-medium">
            Code Name
          </label>
          <input
            type="text"
            name="code"
            id="code"
            className="form-control"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.code && formik.errors.code ? (
            <div
              className="alert alert-danger d-flex align-items-center mt-2"
              role="alert"
            >
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              <div>{formik.errors.code}</div>
            </div>
          ) : null}
        </div>
        {/* Description */}
        <div className="col-md-6">
          <label htmlFor="description" className="mb-3 fw-medium">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="form-control"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div
              className="alert alert-danger d-flex align-items-center mt-2"
              role="alert"
            >
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              <div>{formik.errors.description}</div>
            </div>
          ) : null}
        </div>
        {/* Start Date */}
        <div className="col-md-6">
          <label htmlFor="startDate" className="mb-3 fw-medium">
            Start Date
          </label>
          <input
            type="datetime-local"
            name="startDate"
            id="startDate"
            className="form-control"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.startDate && formik.errors.startDate ? (
            <div
              className="alert alert-danger d-flex align-items-center mt-2"
              role="alert"
            >
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              <div>{formik.errors.startDate}</div>
            </div>
          ) : null}
        </div>
        {/* End Date */}
        <div className="col-md-6">
          <label htmlFor="endDate" className="mb-3 fw-medium">
            End Date
          </label>
          <input
            type="datetime-local"
            name="endDate"
            id="endDate"
            className="form-control"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.endDate && formik.errors.endDate ? (
            <div
              className="alert alert-danger d-flex align-items-center mt-2"
              role="alert"
            >
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              <div>{formik.errors.endDate}</div>
            </div>
          ) : null}
        </div>
        {/* Discount Percentage*/}
        <div className="col-md-6">
          <label htmlFor="discountAmount" className="mb-3 fw-medium">
            Discount Percentage
          </label>
          <input
            type="text"
            name="discountAmount"
            id="discountAmount"
            className="form-control"
            value={formik.values.discountAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.discountAmount && formik.errors.discountAmount ? (
            <div
              className="alert alert-danger d-flex align-items-center mt-2"
              role="alert"
            >
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              <div>{formik.errors.discountAmount}</div>
            </div>
          ) : null}
        </div>
        {/* stores */}
        <div className="col-md-6">
          <label htmlFor="store" className="mb-3 fw-medium">
            Stores
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="storeId"
            id="store"
            value={formik.values.storeId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option selected>Choose Store</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-md-end justify-content-center w-100 mt-5">
        <button type="submit" className="btn btn-outline-success px-5 py-2">
          Create
        </button>
      </div>

      {userMsg && (
        <div className="alert alert-success mt-3 text-center" role="alert">
          {userMsg}
        </div>
      )}

      {userError && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {userError}
        </div>
      )}
    </form>
  );
}
