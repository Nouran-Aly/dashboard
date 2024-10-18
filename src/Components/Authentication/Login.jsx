import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import login from "../../assets/login.png";
import logo from "../../assets/whitelogo.png";
import darkLogo from "../../assets/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let mySchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  async function handleLogin(values) {
    setIsLoading(true);
    return await axios
      .post("http://nilelon.somee.com/api/Authentication/Login", values)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoading(false);
      });
  }

  return (
    <div className="login h-100 py-5">
      <div className="container h-100">
        <div className="login-container d-flex justify-content-center align-items-center h-100">
          <div className="row g-0 w-100">
            <div className="col-md-6">
              <div className="rounded-container white-background p-5 d-flex flex-column gap-3">
                <img src={darkLogo} className="dark-logo mb-4 mx-auto" />
                <h3>Welcome Boss !!!</h3>
                <p className="text-muted">Please Login With Your Account</p>
                <form onSubmit={formik.handleSubmit}>
                  {/* email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="mb-2">
                      Email
                    </label>
                    <div className="input-box">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter Your Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="icon">
                        <i className="fa-regular fa-envelope" />
                      </div>
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <div
                        className="alert alert-danger d-flex align-items-center mt-2"
                        role="alert"
                      >
                        <i className="fa-solid fa-circle-exclamation me-2"></i>
                        <div>{formik.errors.email}</div>
                      </div>
                    ) : null}
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label htmlFor="password" className="mb-2">
                      Password
                    </label>
                    <div className="input-box">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter Your Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="icon">
                        <i className="fa-solid fa-fingerprint"></i>
                      </div>
                      <div onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <i className="showPassword fa-regular fa-eye position-absolute "></i>
                        ) : (
                          <i className="showPassword fa-regular fa-eye-slash position-absolute "></i>
                        )}
                      </div>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div
                        className="alert alert-danger d-flex align-items-center mt-2"
                        role="alert"
                      >
                        <i className="fa-solid fa-circle-exclamation me-2"></i>
                        <div>{formik.errors.password}</div>
                      </div>
                    ) : null}
                  </div>

                  {/* forget password */}
                  <Link to="forgetAccount">
                    <p className="text-decoration-underline text-end">
                      Forget Password?
                    </p>
                  </Link>

                  {isLoading ? (
                    <button
                      type="submit"
                      className="btn w-100 py-3 text-white fw-medium mt-3"
                    >
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn w-100 py-3 text-white fw-medium mt-3"
                    >
                      Login
                    </button>
                  )}
                </form>
              </div>
            </div>

            <div className="col-md-6 d-none d-md-block ">
              <div className="right-side w-100 h-100 rounded-end-4">
                <div className="d-flex flex-column gap-4 justify-content-center align-items-center  h-100">
                  <img src={logo} className="logo-img" />
                  <h5 className="text-capitalize text-white">
                    Welcome to nilelon dashboard
                  </h5>
                  <img src={login} className="login-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
