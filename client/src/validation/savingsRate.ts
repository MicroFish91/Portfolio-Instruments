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
