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
  .object().shape({
    title: yup.object().shape({
      shortTitle: yup.string()
        .required("Category is required!")
        .matches(/^.{5,}$/, "Product Category is too short."),
      longTitle: yup
        .string()
        .required("Title is required!")
        .matches(/^.{5,}$/, "Product Title is too short."),
    }),
    tagline: yup
      .string()
      .required("Tag Line is required!")
      .matches(/^.{5,}$/, "Product Tag Line is too short"),
    price: yup.object().shape({
      mrp: yup
        .string()
        .required("Product mrp is required!")
        .matches(/^[0-9-.,]*$/, "Product MRP can only be numbers."),
      discount: yup
        .string()
        .required("Product cost is required!")
        .matches(/^[0-9]{1,2}$/, "Product Discount is not valid."),
    }),
    discount: yup
      .string()
      .required("Discount Tag is required!")
      .matches(/^.{5,}$/, "Product Discount Tag is too short."),
    description: yup
      .string()
      .required('Description is required!')
      .matches(/^.{20,}$/, "Product Description is too short."),
      url: yup
      .string()
      .required('Image is required!')
      .matches(
        /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
        "Product Image url is invalid."
      )
  })
  .required();
