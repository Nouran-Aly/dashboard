import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import otpPic from "../../assets/OTP security 1.png";
import { Link, useNavigate } from "react-router-dom";

export default function Otp() {
  const [userMessage, setUserMessage] = useState("");
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [code, setCode] = useState(false);

  // let { userToken } = useContext(Auth);
  const navigate = useNavigate();

  // const tokenOtp = localStorage.getItem("userToken");
  // const newToken = localStorage.getItem("newToken");
  // const decodeToken = jwtDecode(newToken);

  // let registerationData = localStorage.getItem("RegestirationData");
  const registerationData = JSON.parse(
    localStorage.getItem("RegestirationData")
  );

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCode(false);
    }
  }, [seconds, code]);

  const formik = useFormik({
    initialValues: {
      userOtp: "",
    },
    onSubmit: (values) => {
      HandleOtp(values);
    },
  });

  async function HandleOtp(values) {
    setIsLoading(true);
    console.log(values);
    console.log("Recieved");
    return await axios
      .post(`${baseUrl}api/Authentication/ValidateOTP`, {
        userOtp: values.userOtp,
        tokenOtp: newToken,
      })
      .then((data) => {
        setUserMessage(data.statusText);
        setIsLoading(false);
        if (data.status == 200) {
          navigate("/newpassword");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoading(false);
        setUserError(error.response.data);
      });
  }

  async function HandleResendEmail() {
    try {
      return await axios
        .post(`${baseUrl}api/Authentication/ResetPasswordEmail`, null, {
          params: {
            email: decodeToken.email,
          },
        })
        .then((data) => {
          console.log("shaghala");
          console.log(data.data);
          localStorage.setItem("newToken", data.data);
          setCode(true);
          setSeconds(60);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="login">
        <div className="login-container d-flex justify-content-center align-items-center h-100">
          <div className="rounded-container rounded-4 white-background p-5 d-flex flex-column gap-3">
            {/* <img src={otpPic} className="w-75 mx-auto" /> */}
            <h2 className="fw-bold">Confirm Your Email</h2>
            <p className="text-muted">We have sent verification code to</p>
            {/* <p className="gmail">{decodeToken.email}</p> */}
            {/* code input field */}
            <form onSubmit={formik.handleSubmit}>
              <div className="text-end mt-3">
                {seconds > 0 || code ? (
                  <span>00:{seconds}</span>
                ) : // <p onClick={() => HandleResendEmail()} className="resend">
                //   Resend code
                // </p>
                null}
              </div>
              <div className="mb-4">
                <label htmlFor="userOtp" className="mb-2">
                  OTP Code:
                </label>
                <div className="input-box">
                  <input
                    type="text"
                    name="userOtp"
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.setFieldValue(
                        e.target.name,
                        e.target.value.toUpperCase()
                      );
                    }}
                    value={formik.values.userOtp}
                    id="userOtp"
                    className="form-control text-uppercase py-2"
                  />
                </div>
              </div>

              {isLoading ? (
                <button
                  className="fs-5 w-100 rounded-2 py-1 text-white"
                  type="submit"
                >
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button
                  className="fs-5 w-100 rounded-2 py-1 text-white"
                  type="submit"
                >
                  Verify
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
                  <i className="fa-solid fa-circle-exclamation me-2"></i>

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
