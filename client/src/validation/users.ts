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
  password: yup
    .string()
    .password()
    .min(5, "Password must contain at least 5 characters.")
    .minLowercase(1, "Password must inclue at least one lowercase character.")
    .minUppercase(1, "Password must include at least one uppercase character.")
    .minNumbers(1, "Password must include at least one number.")
    .minSymbols(0)
    .max(255, "Password cannot exceed 255 characters.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match.")
    .required("Confirm password is required."),
});

export const changeNotificationFormSchema = yup.object().shape({
  rebalanceThreshold: yup
    .number()
    .integer("Please enter an integer value.")
    .min(0, "Integer value must be 0 or higher.")
    .max(50, "Integer value must be 50 or lower.")
    .required("Rebalance threshold is required."),
  vpThreshold: yup
    .number()
    .integer("Please enter an integer value.")
    .min(0, "Integer value must be 0 or higher.")
    .max(90, "Integer value must be 90 or lower.")
    .required("Variable portfolio threshold is required."),
});

export const passwordFormSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .password()
    .min(5, "Password must contain at least 5 characters.")
    .minLowercase(1, "Password must inclue at least one lowercase character.")
    .minUppercase(1, "Password must include at least one uppercase character.")
    .minNumbers(1, "Password must include at least one number.")
    .minSymbols(0)
    .max(255, "Password cannot exceed 255 characters.")
    .required("Current password is required."),
  newPassword: yup
    .string()
    .password()
    .min(5, "Password must contain at least 5 characters.")
    .minLowercase(1, "Password must inclue at least one lowercase character.")
    .minUppercase(1, "Password must include at least one uppercase character.")
    .minNumbers(1, "Password must include at least one number.")
    .minSymbols(0)
    .max(255, "Password cannot exceed 255 characters.")
    .notOneOf([yup.ref("currentPassword"), null], "Password must be original.")
    .required("New password is required."),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Password must match.")
    .required("Confirm new password is required."),
});
