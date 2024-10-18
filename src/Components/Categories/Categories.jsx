import React, { useEffect } from "react";
import tshirt from "../../assets/new.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [userMsg, setUserMsg] = useState("");
  const [userError, setUserError] = useState("");

  // change image to base64
  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = reader.result;
      const formattedImage = image.split(",")[1];
      console.log(formattedImage);

      formik.setFieldValue("image", formattedImage);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  async function getTopOrdereedCategories() {
    return axios
      .get("http://nilelon.somee.com/api/Category/GetTopOrderedCategories")
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    onSubmit: (values) => {
      console.log(values);
      createCategory(values);
    },
  });

  async function createCategory(values) {
    return axios
      .post("http://nilelon.somee.com/api/Category/CreateCategory", values)
      .then((res) => {
        console.log(res);
        console.log("added");
        setUserMsg(res.data.result);
      })
      .catch((error) => {
        console.log(error);
        setUserError(error.response.statusText);
      });
  }

  useEffect(() => {
    getTopOrdereedCategories();
  }, []);

  return (
    <div className="categories container">
      <div className="row row-gap-4 ">
        <div className="col-md-6">
          <div className="white-background p-3 rounded-3">
            <div className="head d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-arrow-down-wide-short"></i>
                <h5>Top Ordered Categories</h5>
              </div>
              <select
                className="form-select w-25"
                aria-label="Default select example"
              >
                <option selected>All Items</option>
                <option value="1">Orders</option>
              </select>
            </div>
            {categories?.map((category, index) => (
              <div className="category py-4 border-top" key={category.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3 fw-medium">
                    <p className="mb-0">{index + 1}.</p>
                    <div className="image-frame">
                      <img
                        src={category.image}
                        className="w-100 p-2 m-auto z-2"
                      />
                    </div>
                    <p className="mb-0">{category.name}</p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="price fw-medium">
                      {category.orderNumbers}
                    </div>
                    <p className="mb-0">item</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="white-background p-3 rounded-3">
            <h5 className="border-bottom py-3">Create New Product Category</h5>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex flex-column gap-5 mt-4">
                <div>
                  <label htmlFor="image" className="mb-3">
                    Upload Category Photo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="div">
                  <label htmlFor="name" className="mb-3">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter The Category Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <button type="submit" className="btn btn-outline-success mb-3">
                  Create Category
                </button>
              </div>
              {userMsg && (
                <div
                  className="alert alert-success mt-3 text-center"
                  role="alert"
                >
                  {userMsg}
                </div>
              )}

              {userError && (
                <div
                  className="alert alert-danger mt-3 text-center"
                  role="alert"
                >
                  {userError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
