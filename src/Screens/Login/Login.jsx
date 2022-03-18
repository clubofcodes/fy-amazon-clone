import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../Common.css";
import { Formik } from 'formik';

const Login = () => {

    const [isEmail, setIsEmail] = useState(false);

    return (
        <section>
            <div className="d-flex flex-column align-items-center">
                
                <div className="app_logo">
                    <img src="./Assets/img/amazon_black.png" alt="signupimg" width="150" />
                </div>

                <div className="card w-25 mt-2">
                    <div className="card-body sign_form">
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Enter your email or mobile phone number';
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.password) {
                                    errors.password = 'Enter your password';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit} method="POST">
                                    <h1>Sign-In</h1>
                                    <div className="form_data">
                                        <label htmlFor="email">Email or mobile phone number</label>
                                        <input type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                    </div>
                                    <div className="form_err">{(errors.email) && <img className="mx-1" src="./Assets/img/err_icon.png" alt="Error icon" width="7" />}{errors.email && errors.email}</div>
                                    {
                                        (values.email && isEmail) && <div className="form_data">
                                            <label htmlFor="password">Password</label>
                                            <input type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                        </div>
                                    }
                                    {(values.email && isEmail) && <div className="form_err">{(errors.password) && <img className="mx-1" src="./Assets/img/err_icon.png" alt="Error icon" width="7" />}{errors.password && errors.password}</div>}

                                    <button type="submit" className="signin_btn mt-3" onClick={() => setIsEmail(values.email ? true : false)} disabled={isSubmitting}>{(values.email && isEmail) ? 'Sign-In' : 'Continue'}</button>
                                </form>
                            )}
                        </Formik>
                        <div className="terms">
                            {!isEmail && <p>By continuing, you agree to Amazon's <span>Conditions of Use </span>and <span>Privacy Notice</span>.</p>}
                        </div>
                    </div>

                    {/* <ToastContainer /> */}
                </div>

                <div className="d-flex mt-3">
                <p className="span_line"><span>New to Amazon?</span></p>
                </div>
                <div className="create_accountinfo">
                    <button> <NavLink to="/register">Create your Amazon Account</NavLink></button>
                </div>
            </div>
        </section>
    )
}

export default Login;