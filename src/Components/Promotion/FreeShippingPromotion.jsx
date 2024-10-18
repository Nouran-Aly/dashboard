import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function FreeShippingPromotion() {
  const [userMsg, setUserMsg] = useState("");
  const [userError, setUserError] = useState("");

  let mySchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    code: Yup.string().required("Code is required"),
    governate: Yup.string().required("City is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      code: "",
      governate: "",
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
        "http://nilelon.somee.com/api/Promotion/CreateFreeShippingPromoCode",
        values
      )
      .then((res) => {
        setUserMsg(res.data.result);
      })
      .catch((error) => {
        setUserError(error.response.statusText);
      });
  }
  return (
    <form onSubmit={formik.handleSubmit} className="my-3">
      <div className="row  row-gap-4">
        {/*  Name */}
        <div className="col-md-6">
          <label htmlFor="name" className="mb-3 fw-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div
              className="alert alert-danger d-flex align-items-center mt-2"
              role="alert"
            >
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              <div>{formik.errors.name}</div>
            </div>
          ) : null}
        </div>
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
          <label htmlFor="governate" className="mb-3 fw-medium">
            City
          </label>
          <input
            type="text"
            name="governate"
            id="governate"
            className="form-control"
            value={formik.values.governate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.governate && formik.errors.governate ? (
            <div
              className="alert alert-danger d-flex align-items-center mt-2"
              role="alert"
            >
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              <div>{formik.errors.governate}</div>
            </div>
          ) : null}
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
