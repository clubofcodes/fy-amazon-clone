import { NavLink, useNavigate } from 'react-router-dom';
import "../Common.css";
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useAuthentication } from '../../Utils/Context/useAuthentication';

const Signup = () => {

    //new state to store user form data.
    const [formData, setFormData] = useState({});
    //new state to store error getting from server.
    const [err, setErr] = useState(null);
    //routing hook to go to particular path.
    const navigate = useNavigate();
    //Custom hook to verify is user logedIn.
    const userAuth = useAuthentication();

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
        <section>
            <div className="d-flex flex-column align-items-center pb-3">

                <div className="app_logo">
                    <NavLink to="/"><img src="./Assets/img/amazon_black.png" alt="App Logo" width="150" /></NavLink>
                </div>

                {(err && err.status === 322) &&
                    <div className="card w-25 mt-1 err_alert_container px-1">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-2">
                                    <img src="./Assets/img/err_alert.png" alt="Error Alert" width="30" />
                                </div>
                                <div className="col-sm-10 px-0">
                                    <h4 className="err_alert_heading mb-1">There was a problem</h4>
                                    <p className="alert_content mb-0">Your provided Email {formData?.email} has already been used. Please use another Email address.</p>
                                </div>
                            </div>
                        </div>
                    </div>}
                {(err && err.status === 422) &&
                    <div className="card w-25 mt-1 alert_container px-1">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-2">
                                    <img src="./Assets/img/warn_alert.png" alt="Warning Alert" width="30" />
                                </div>
                                <div className="col-sm-10 px-0">
                                    <h4 className="alert_heading mb-1">Mobile number already in use</h4>
                                    <p className="alert_content mb-0">You indicated you are a new customer, but an account already exists with the mobile number <b>+91{formData?.mNumber}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>}

                <div className="card w-25 mt-2">
                    <div className="card-body sign_form pt-2">
                        <Formik
                            initialValues={{ fullname: '', mNumber: '', email: '', password: '' }}
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
                                setFormData({ ...formData, ...values });

                                setTimeout(() => {
                                    // alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit} method="POST">
                                    <h1>Create Account</h1>
                                    <div className="form_data">
                                        <label htmlFor="fullname">Your Name</label>
                                        <input type="text" name="fullname" onChange={handleChange} value={values.fullname} />
                                    </div>
                                    <div className="form_err">{(errors.fullname) && <img className="mx-1" src="./Assets/img/err_icon.png" alt="Error icon" width="7" />}{errors.fullname && errors.fullname}</div>

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
                                        <input type="password" name="password" onChange={handleChange} value={values.password} />
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
            </div>
        </section>
    )
}

export default Signup