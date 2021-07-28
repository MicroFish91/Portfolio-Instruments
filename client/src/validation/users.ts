import * as yup from "yup";
import yupPassword from "yup-password";

yupPassword(yup);

export const loginFormSchema = yup.object().shape({
  email: yup.string().email("Email is invalid.").required("Email is required."),
  password: yup.string().required("Password is required."),
});

export const registrationFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First name must be 2 characters or more.")
    .max(20, "First name must be 20 characters or less.")
    .required("First name is required.")
    .matches(/^[a-zA-Z]*$/, "Only alphabets characters are allowed."),
  lastName: yup
    .string()
    .min(2, "Last name must be 2 characters or more.")
    .max(20, "Last name must be 20 characters or less.")
    .required("Last name is required.")
    .matches(/^[a-zA-Z]*$/, "Only alphabets characters are allowed."),
  email: yup
    .string()
    .email("Email is invalid.")
    .min(8, "Email must be at least 8 characters.")
    .max(45, "Email must be 45 characters or less.")
    .required("Email is required."),
  password: yup.string().password().required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match.")
    .required("Confirm password is required."),
});
