import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useAuthentication } from '../../Utils/Context/useAuthentication';
import { Formik } from 'formik';
import "../../Screens/Common.css";
import { addUser, updateUser } from "../../Redux/Users/UserAction";

const UserForm = () => {
  //new state to store user form data.
  const [formData, setFormData] = useState({});
  //new state to store error getting from server.
  const [err, setErr] = useState(null);
  //routing hook to go to particular path.
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  //Custom hook to verify is user logedIn.
  const userAuth = useAuthentication();
  const [user, setuser] = useState(location?.state?.data)
  const [edit, setEdit] = useState(location?.state?.edit)
  const getValidUserData = async () => {
    const validUserResponse = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const validUserData = await validUserResponse.json();
    // console.log(validUserData);
    (validUserResponse.status !== 200) ? console.log("First login") : userAuth.login(validUserData); //sets logedInEmail data in state of global context.
  }

  useEffect(() => {
    getValidUserData();
    const registerUser = async () => {
      const addUserResponse = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const sentData = await addUserResponse.json();
      // console.log("Submited Data:", sentData);
      // console.log("Submited Data:", addUserResponse.status, sentData.error);

      (sentData?.error) ? setErr({ status: addUserResponse.status, err: sentData.error }) : navigate("/", { replace: true });
      !(sentData?.error) && setFormData({});
    }
    registerUser();

  }, [formData]);

  return (
    <div className="card col-md-4 offset-4">
      <div className="card-body sign_form pt-2">
        <Formik
          initialValues={{ fullname: edit ? user.fullname :'', mNumber: edit ? user.mNumber :'', email: edit ? user.email :'', password: edit ? user.password :'', userRole: edit ? user.userRole :'customer' }}
          validate={values => {
            const errors = {};

            (!values.fullname) && (errors.fullname = !values.fullname && "Enter your name");
            (!values.mNumber) && (errors.mNumber = !values.mNumber && "Enter your mobile number");
            if (!values.email) {
              errors.email = "Enter your email";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Enter your password";
            } else if (values.password.length < 6) {
              errors.password = "Passwords must be at least 6 characters."
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // setFormData({ ...formData, ...values });
            console.log("userForm id ",values, user?._id);
            dispatch(updateUser(user?._id, values));
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} method="POST">
              {<h1>Create Account</h1>}
              <div className="form_data">
                <label htmlFor="fullname">Your Name</label>
                <input type="text" name="fullname" onChange={handleChange} value={values.fullname} />
              </div>
              <div className="form_err">{(errors.fullname) && <img className="mx-1" src={'err_icon'} alt="Error icon" width="7" />}{errors.fullname && errors.fullname}</div>

              <div className="form_data">
                <label htmlFor="tel_number">Mobile Number</label>
                <input type="text" name="mNumber" onChange={handleChange} value={values.mNumber} />
              </div>
              <div className="form_err">{(errors.mNumber) && <img className="mx-1" src="./Assets/img/err_icon.png" alt="Error icon" width="7" />}{errors.mNumber && errors.mNumber}</div>

              <div className="form_data">
                <label htmlFor="email">Email (optional)</label>
                <input type="email" name="email" onChange={handleChange} value={values.email} />
              </div>
              <div className="form_err">{(errors.email) && <img className="mx-1" src="./Assets/img/err_icon.png" alt="Error icon" width="7" />}{errors.email && errors.email}</div>

              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange} value={values.password}  />
              </div>
              {(!values.password || errors.password) && <div className={errors.password ? "form_err" : "form_err text-dark"}><img className="mx-1" src={errors.password ? "./Assets/img/err_icon.png" : "./Assets/img/info_icon.png"} alt="Error icon" width="7" />{errors.password ? errors.password : "Passwords must be at least 6 characters."}</div>}

              <div className="info mt-3">
                <p>We will send you a text to verify your phone.<br />Message and Data rates may apply.</p>
              </div>

              <button type="submit" className="signin_btn mt-1" disabled={isSubmitting}>Continue</button>

              <div className="shadow_divider"></div>
              <div className="signin_info mb-0">
                <p className="mb-0">Already have an account?</p>
                <NavLink to="/signin">Sign in<img className="mx-1" src="./Assets/img/right_arrow.png" alt="Error icon" width="4" /></NavLink>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );

}
export default UserForm;
