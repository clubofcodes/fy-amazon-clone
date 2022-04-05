import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Common.css";
import { Formik } from "formik";
import { useAuthentication } from "../../Utils/Context/useAuthentication";

const Login = () => {

    //new state to verify user has enter email then show pwd field.
    const [isEmail, setIsEmail] = useState(false);
    //new state to store user form data.
    const [formData, setFormData] = useState({});
    //new state to store error getting from server.
    const [err, setErr] = useState(null);
    //routing hook to go to particular path.
    const navigate = useNavigate();
    //Custom hook to store logedIn user email to context.
    const userAuth = useAuthentication();

    useEffect(() => {
        const loginUser = async () => {
            const response = await fetch("/login", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const verifiedData = await response.json();

            (verifiedData?.error) && setErr(verifiedData.error)

            if (!verifiedData?.error) {
                userAuth.login(verifiedData);
                console.log(verifiedData.userRole === 'admin' ? 'hi' : 'hello'); //sets logedInEmail data in state of global context.
                setErr(null);
                if (verifiedData.userRole === 'admin')  {navigate("/admin", {replace:true}); console.log('admin')}
                else {navigate('/',{replace: true}); console.log('user');}
            }
        }
        loginUser();

    }, [formData]);

    return (
        <section>
            <div className="d-flex flex-column align-items-center">

                <div className="app_logo">
                    <NavLink to="/"><img src="./Assets/img/amazon_black.png" alt="App Logo" width="150" /></NavLink>
                </div>

                {(err && (err === "Invalid Credentials" || err === "User doesn't exist!!")) &&
                    <div className="card w-25 mt-1 err_alert_container px-1 mb-2">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-2">
                                    <img src="./Assets/img/err_alert.png" alt="Error Alert" width="30" />
                                </div>
                                <div className="col-sm-10 px-0">
                                    <h4 className="err_alert_heading mb-1">{!isNaN(formData.email) ? "Incorrect phone number" : ((err === "Invalid Credentials" || err === "User doesn't exist!!")) && "There was a problem"}</h4>
                                    <p className="alert_content mb-0">{err === "Invalid Credentials" ? "Your password is incorrect." : isNaN(formData.email) ? "We cannot find an account with that email address" : "We cannot find an account with that mobile number"}</p>
                                </div>
                            </div>
                        </div>
                    </div>}

                <div className="card w-25 mt-2 p-2">
                    <div className="card-body sign_form py-0">
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};

                                if (!values.email) {
                                    errors.email = "Enter your email or mobile phone number";
                                } else if (!isNaN(values.email)) {
                                    if (values.email.length !== 10) errors.email = "Number must be 10 digits long";
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = "Invalid email address";

                                if (!values.password) {
                                    errors.password = "Enter your password";
                                } else if (values.password.length < 6) errors.password = "Passwords must be at least 6 characters."

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
                                    <h1>Sign-In</h1>
                                    <div className="form_data">
                                        <label htmlFor="email">Email or mobile phone number</label>
                                        <input type="text" name="email" onChange={handleChange} value={values.email} />
                                    </div>
                                    <div className="form_err">{(errors.email) && <img className="mx-1" src="./Assets/img/err_icon.png" alt="Error icon" width="7" />}{errors.email && errors.email}</div>
                                    {
                                        (values.email && isEmail) && <div className="form_data">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" onChange={handleChange} value={values.password} />
                                        </div>
                                    }
                                    {(values.email && isEmail) && <div className="form_err">{(errors.password) && <img className="mx-1" src="./Assets/img/err_icon.png" alt="Error icon" width="7" />}{errors.password && errors.password}</div>}

                                    <button type="submit" className="signin_btn mt-3" onClick={() => setIsEmail(values.email ? true : false)} disabled={isSubmitting}>{(values.email && isEmail) ? "Sign-In" : "Continue"}</button>
                                </form>
                            )}
                        </Formik>
                        <div className="terms">
                            {!isEmail && <p>By continuing, you agree to Amazon's <span>Conditions of Use </span>and <span>Privacy Notice</span>.</p>}
                        </div>
                    </div>
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