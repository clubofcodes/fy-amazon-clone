import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCategory, updateCategory } from "../../../Redux/Category/CategoryAction";

const AddCategory = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [categoryData, setCategory] = useState(location?.state?.cat);
  const [edit, setEdit] = useState(location?.state?.edit);

  return (
    <>
      <div className="card col-md-3 offset-4 mt-5">
      <div className="card-body sign_form pt-2">
        <Formik
          initialValues={{ category: edit ? categoryData.category: '' }}
          validate={values => {
            const errors = {};
            console.log(values.category);
            if (!values.category) {
              errors.category = "Enter Category";
            } else if (values.category.length<3) {
              errors.email = "Category name is too short";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // setFormData({ ...formData, ...values });
            edit ? dispatch(updateCategory(categoryData?._id, values, navigate))
              : dispatch(addCategory(values, navigate));
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} method="POST">
              {<h1>{location?.state?.name}</h1>}
              <div className="form_data">
                <label htmlFor="name">Category Name</label>
                <input type="text" name="category" onChange={handleChange} value={values.category} />
              </div>
              <div className="form_err">{(errors.category) && <img className="mx-1" src={'err_icon'} alt="Error icon" width="7" />}{errors.category && errors.category}</div>

              <button type="submit" className="signin_btn mt-1">Continue</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
};

export default AddCategory;
