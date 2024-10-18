import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import security from "../../assets/security.png";
// import { Auth } from "../Context/OtpContext";
import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { baseUrl } from "../../Components/Context/BaseUrl";

export default function ForgetAccount() {
  const [userMessage, setUserMessage] = useState("");
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // let { userToken } = useContext(Auth);
  const navigate = useNavigate();

  // const token = localStorage.getItem("userToken");

  const baseUrl = "hhtp";
  const validationSchema = Yup.object({
    targetValue: Yup.string()
      .required("Email or phone number is required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[+\d]?(?:[\d-.\s()]*)$/,
        "Invalid email or phone number"
      ),
  });

  const formik = useFormik({
    initialValues: {
      targetValue: "",
    },
    validationSchema,
    onSubmit: (values) => {
      HandleForget(values); // Pass email directly
    },
  });

  async function HandleForget(values) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(values.targetValue);
    try {
      setIsLoading(true);
      setUserMessage("");

      // email
      if (isEmail) {
        const url = `${baseUrl}api/Authentication/ResetPasswordEmail`;
        const { data } = await axios.post(url, null, {
          params: {
            email: values.targetValue,
          },
        });
        localStorage.setItem("newToken", data);
        // localStorage.setItem("RegestirationData", JSON.stringify(values));
        setIsRegistered(data);

        if (data) {
          console.log("tmam");
          navigate("/resetEmail");
        }
        setIsLoading(false);
      }

      //password
      else {
        const url =
          "http://nilelon.somee.com/api/Authentication/ResetPasswordPhone";
        const { data } = await axios.post(url, null, {
          params: {
            phone: values.targetValue,
          },
        });
        setIsLoading(false);
        console.log(data);
      }
      console.log("Response data:", data);
    } catch (error) {
      console.log(error.response.data);
      setUserError(error.response.data);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="login">
        <div className="login-container d-flex justify-content-center align-items-center h-100">
          <div className="rounded-container rounded-4 white-background p-5 d-flex flex-column gap-3">
            <img src={security} className="security-logo m-auto" />
            <h2 className="fw-bold text-center">Forget Your Account ?</h2>
            <p className="text-muted">
              Enter Your Email Or Phone Number To Verification
            </p>
            {/* code input field */}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="targetValue" className="mb-2">
                  Email Or Phone Number:
                </label>
                <div className="input-box mb-2">
                  <input
                    type="text"
                    name="targetValue"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    id="targetValue"
                    className="form-control w-100 py-2 px-3"
                  />
                </div>
              </div>

              {isLoading ? (
                <button className="fs-5 btn w-100" type="submit">
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button className="fs-5 btn w-100 text-white" type="submit">
                  Continue
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
