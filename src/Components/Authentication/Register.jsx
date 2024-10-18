import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import registerPic from "../../assets/Frame.png";
import rightSide from "../../assets/rightside.png";
import logo from "../../assets/whitelogo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Register() {
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const navigate = useNavigate();
  //   let { setIsRegistered } = useContext(Auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setshowConfirmPass(!showConfirmPass);
  };

  let myShema = Yup.object({
    fullName: Yup.string()
      .required("Name is Required")
      .min(2, "Cant be less than 2 letters"),
    email: Yup.string().required("Email is Required").email("Invalid Email"),
    phoneNumber: Yup.string().required("Phone Number Is Required"),
    // .matches(/^\d{11}$/, "Phone Number Is Not Valid"),
    password: Yup.string().required("Password is Required"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/,
    //   "Password is not valid"
    // ),
    confirmPassword: Yup.string()
      .required("Enter the same password")
      .oneOf([Yup.ref("password")], "Passwords doesn't match"),
  });
  let formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      profilePic: "",
      password: "",
    },
    validationSchema: myShema,
    // onSubmit: (OtpForm),
    onSubmit: (values) => {
      OtpForm(values);
    },
  });

  async function OtpForm(values) {
    setIsLoading(true);

    return await axios
      .post("http://nilelon.somee.com/api/Authentication/AdminRegister")
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error response data:", error?.response?.data);
        setUserError(error.response.data);
        setIsLoading(false);
      });

    console.log("OtpForm called with values:", values);
    try {
      setIsLoading(true);
      setUserMessage("");

      const url = "http://nilelon.somee.com/api/Authentication/AdminRegister";
      const { data } = await axios.post(url, null, {
        params: {
          email: values.email,
        },
      });

      localStorage.setItem("userToken", data);
      localStorage.setItem("RegestirationData", JSON.stringify(values));
      setIsRegistered(data);
      navigate("/otp");
      console.log("Response data:", data);
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
    <div className="login py-5 h-100">
      <div className="register-content pb-5 h-100" id="signUpSection">
        <div className="container bg-white rounded-5 overflow-hidden">
          <div className="row">
            <div className="col-md-6 p-5 col-sm-12">
              <h3 className="text-capitalize">create account</h3>
              <p className="lead register-p">
                Register with your valid email address
              </p>

              <form onSubmit={formik.handleSubmit}>
                {/* Full name */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="mb-2">
                    Full Name
                  </label>
                  <div className="input-box mb-2">
                    <input
                      type="text"
                      name="fullName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      id="fullName"
                      className="form-control"
                      placeholder="Enter Your Name"
                    />
                    <div className="icon">
                      <i className="fa-brands fa-mailchimp"></i>
                    </div>
                  </div>
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div
                      className="alert alert-danger d-flex align-items-center"
                      role="alert"
                    >
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      <div>{formik.errors.fullName}</div>
                    </div>
                  ) : null}
                </div>

                {/* User email */}
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
                      className="form-control"
                      placeholder="Enter Your Email"
                    />
                    <div className="icon">
                      <i className="fa-regular fa-paper-plane"></i>
                    </div>
                  </div>

                  {formik.touched.email && formik.errors.email ? (
                    <div
                      className="alert alert-danger d-flex align-items-center"
                      role="alert"
                    >
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      <div>{formik.errors.email}</div>
                    </div>
                  ) : null}
                </div>

                {/* Phone number */}
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="mb-2">
                    Phone Number
                  </label>
                  <div className="input-box d-flex gap-3 mb-2">
                    <input
                      type="tel"
                      name="phoneNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                      id="phoneNumber"
                      className="form-control"
                      placeholder={"01012345678"}
                    />
                    <div className="icon">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                  </div>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div
                      className="alert alert-danger d-flex align-items-center"
                      role="alert"
                    >
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      <div>{formik.errors.phoneNumber}</div>
                    </div>
                  ) : null}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="mb-2">
                    Password
                  </label>
                  <div className="input-box mb-2 position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      id="password"
                      className="form-control"
                      placeholder="Enter Your password"
                    />
                    <div className="icon">
                      <i className="fa-solid fa-key"></i>
                    </div>
                    <div onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <i className="showPassword fa-solid fa-eye position-absolute "></i>
                      ) : (
                        <i className="showPassword fa-regular fa-eye-slash position-absolute "></i>
                      )}
                    </div>
                  </div>

                  {formik.touched.password && formik.errors.password ? (
                    <div
                      className="alert alert-danger d-flex align-items-center"
                      role="alert"
                    >
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      <div>{formik.errors.password}</div>
                    </div>
                  ) : null}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="mb-2">
                    Confirm Password
                  </label>
                  <div className="input-box mb-2">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Your password"
                    />
                    <div className="icon">
                      <i className="fa-solid fa-key"></i>
                    </div>
                    <div onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPass ? (
                        <i className="showPassword fa-solid fa-eye position-absolute "></i>
                      ) : (
                        <i className="showPassword fa-regular fa-eye-slash position-absolute "></i>
                      )}
                    </div>
                  </div>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div
                      className="alert alert-danger d-flex align-items-center"
                      role="alert"
                    >
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      <div>{formik.errors.confirmPassword}</div>
                    </div>
                  ) : null}
                </div>

                <p className="pt-3 pb-5">
                  By clicking register you agree to <span>our Terms</span> and
                  <span>Conditions of Use</span>
                </p>

                {isLoading ? (
                  <button
                    className="fs-5 btn w-100 text-white py-2"
                    type="submit"
                  >
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    className="fs-5 btn w-100 text-white py-2"
                    type="submit"
                  >
                    Register
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

            <div className="col-md-6 p-5 right-side d-none d-md-block ">
              <div className="info d-flex flex-column justify-content-center text-center gap-3 pt-4">
                <img src={logo} className="small-logo" width="100px" />
                <h2 className="text-white py-3">Welcome to Nilelon</h2>
                <img src={registerPic} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
