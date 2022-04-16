import * as yup from "yup";

export const incomeTaxFormSchema = yup.object().shape({
  grossPay: yup
    .string()
    .matches(
      /^[+]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be a positive number with at most 2 decimals."
    )
    .required("Please enter your annual gross pay."),
  federalTax: yup
    .string()
    .matches(
      /^[+]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be a positive number with at most 2 decimals."
    )
    .required("Please enter the estimated value you will pay in federal tax."),
  fica: yup
    .string()
    .matches(
      /^[+]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be a positive number with at most 2 decimals."
    )
    .required("Please enter the estimated value you will pay in FICA taxes."),
  medicare: yup
    .string()
    .matches(
      /^[+]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be a positive number with at most 2 decimals."
    )
    .required(
      "Please enter the estimated value you will pay in Medicare taxes."
    ),
  state: yup
    .string()
    .matches(
      /^[+]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be a positive number with at most 2 decimals."
    )
    .required("Please enter the estimated value you will pay in state taxes."),
  other: yup
    .string()
    .matches(
      /^[+]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be a positive number with at most 2 decimals."
    )
    .required(
      "Please sum up and enter any remaining income taxes into this field."
    ),
});

export const allocationCategoryFormSchema = yup.object().shape({
  allocationLabel: yup
    .string()
    .max(30, "The allocation label should be 25 letters or less.")
    .required("An allocation label is required."),
  allocationAmount: yup
    .string()
    .matches(
      /^[+]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be a positive number with at most 2 decimals."
    )
    .required("An allocation amount is required."),
  periodsPerYear: yup
    .string()
    .matches(
      /^[1-9]$|^[1-4]\d$|^5[0-2]$/,
      "Enter a whole number between 1 and 52."
    )
    .required(
      "Please enter the number of periods this amount will be applied per year."
    ),
});
