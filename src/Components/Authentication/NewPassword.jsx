import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import otpPic from "../../assets/OTP security 1.png";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function NewPassword() {
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let { registerationData, setRegisterationData } = useContext;

  // TOKEN
  const token = localStorage.getItem("newToken");

  let mySchema = Yup.object({
    email: Yup.string().required("Email is Required").email("Invalid Email"),
    password: Yup.string().required("Password is Required"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/,
    //   "Password is not valid"
    // ),
  });

  let formik = useFormik({
    initialValues: {
      token: "",
      targetValue: "",
      newValue: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      HandleForgetPassword(values);
    },
  });

  async function HandleForgetPassword(values) {
    console.log(" values:", values);
    try {
      setIsLoading(true);
      setUserMessage("");

      const apiValues = {
        token: token,
        targetValue: values.email,
        newValue: values.password,
      };

      // Send POST request with query parameters in the URL
      const { data } = await axios.post(
        `${baseUrl}api/Authentication/ForgotPassword`,
        apiValues
      );

      console.log("Response data:", data);
      console.log("ESHTA 3LEEEKYYYY");
      navigate("/login");

      setUserMessage("Check your email for further instructions.");
    } catch (error) {
      console.error("Error response data:", error?.response?.data);
      setUserError(error.response.data);
      setIsLoading(false);
    } finally {
      console.log("Loading finished");
    }
  }

  return (
    <>
      <div className="login py-5">
        <div className="login-container d-flex justify-content-center align-items-center h-100">
          <div className="rounded-container rounded-4 white-background p-5 d-flex flex-column gap-3">
            {/* <img src={otpPic} alt="" /> */}
            <h2 className="fw-bold">Change Your Password</h2>
            {/* code input field */}
            <form onSubmit={formik.handleSubmit} className="w-100">
              {/* EMAIL */}
              <div className="mb-3">
                <label htmlFor="email" className="mb-2">
                  Email
                </label>
                <div className="input-box mb-2">
                  <input
                    type="text"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    id="email"
                    className="form-control py-2 px-3"
                    placeholder="Enter Your Email"
                  />
                </div>

                {formik.touched.email && formik.errors.email ? (
                  <div
                    class="alert alert-danger d-flex align-items-center"
                    role="alert"
                  >
                    <i class="fa-solid fa-circle-exclamation me-2"></i>
                    <div>{formik.errors.email}</div>
                  </div>
                ) : null}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="mb-2">
                  Password
                </label>
                <div className="input-box mb-2">
                  <input
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    id="password"
                    className="form-control py-2 px-3"
                    placeholder="Enter Your password"
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div
                    class="alert alert-danger d-flex align-items-center"
                    role="alert"
                  >
                    <i class="fa-solid fa-circle-exclamation me-2"></i>
                    <div>{formik.errors.password}</div>
                  </div>
                ) : null}
              </div>

              {isLoading ? (
                <button className="fs-5 mt-4" type="submit">
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button
                  className="fs-5 btn w-100 text-white mt-4"
                  type="submit"
                >
                  Save
                </button>
              )}

              {userMessage ? (
                <div
                  className="alert alert-success d-flex align-items-center mt-2 text-center w-100"
                  role="alert"
                >
                  <div className="">Success</div>
                </div>
              ) : null}

              {userError ? (
                <div
                  className="alert alert-danger d-flex align-items-center mt-3"
                  role="alert"
                >
                  <div>{userError}</div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
