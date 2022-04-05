import * as yup from "yup";

// Signup Validation Schema
export const signUpSchema = yup
  .object({
    firstname: yup
      .string()
      .required("Firstname is required!")
      .matches(/^([^0-9\W]*)$/, "Name can only contain alphabets."),
    lastname: yup
      .string()
      .required("Lastname is required!")
      .matches(/^([^0-9\W]*)$/, "Name can only contain alphabets."),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required("Phone is required!")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits."),
    username: yup
      .string()
      .min(3, "Minimum 3 characters allowed")
      .required("Username is required!"),
    password: yup
      .string()
      .required("Password is required!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),

    // number: yup
    //   .string()
    //   .matches(/^[0-9]*$/, "Block number can only be numbers.")
    //   .required("Block number is required!"),
    // street: yup.string().required("Street is required!"),
    city: yup
      .string()
      .matches(/^([^0-9\W]*)$/, "Name can only contain alphabets")
      .required("City is required!"),
    zipcode: yup
      .string()
      .matches(/^[0-9-]*$/, "Zipcode can only be numbers.")
      .required("Zipcode is required!"),
  })
  .required();

// Signin Validation Schema
export const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

// Product Validation Schema
export const productSchema = yup
  .object({
    title: yup
      .string()
      .matches(/^.{3,}$/, "Title can only contain alphabets.")
      .required("Title is required!")
      .required(),
    price: yup
      .string()
      .matches(/^[0-9-.,]*$/, "Price can only be numbers.")
      .required("Price is required!"),
    description: yup
      .string()
      .matches(/^.{30,}$/, "Product Description is too short.")
      .required(),
    category: yup.string().required(),
    image: yup
      .string()
      .matches(
        /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
        "Product Image url is invalid."
      )
      .required(),
  })
  .required();
