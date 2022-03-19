import { NavLink } from 'react-router-dom';
import "../Common.css";
import { Formik } from 'formik';
import { useState } from 'react';

const Signup = () => {

    //new state to store user form data.
    const [formData, setFormData] = useState([]);

    return (
        <section>
            <div className="d-flex flex-column align-items-center">

                <div className="app_logo">
                    <NavLink to="/"><img src="./Assets/img/amazon_black.png" alt="App Logo" width="150" /></NavLink>
                </div>

                <div className="card w-25 mt-2">
                    <div className="card-body sign_form pt-2">
                        <Formik
                            initialValues={{ fullname: '', mNumber: '', email: '', password: '' }}
                            validate={values => {
                                const errors = {};

                                (!values.fullname) && (errors.fullname = !values.fullname && "Enter your name");
                                (!values.mNumber) && (errors.mNumber = !values.mNumber && "Enter your mobile number");
                                (!values.email) && (errors.email = !values.email ? "Enter your email or mobile phone number" : (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) && "Invalid email address");
                                (!values.password) && (errors.password = !values.password ? "Enter your password" : (values.password.length < 8) && "Passwords must be at least 6 characters.");

                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setFormData([...formData, values]);
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
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
        </section >
    )
}

export default Signup