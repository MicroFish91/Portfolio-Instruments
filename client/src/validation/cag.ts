import * as yup from "yup";

export const cagFormSchema = yup.object().shape({
  annualExpenses: yup
    .string()
    .matches(
      /^[+]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be numeric with at most 2 decimals."
    ),
  annualInflation: yup
    .string()
    .matches(
      /^(?:100|\d{1,2})(?:\.\d{1,2})?$/,
      "Must be a value between 0 and 100 with at most 2 decimals."
    )
    .required(
      "An annual inflation rate is required. If annual return = real return, enter 0."
    ),
  annualReturn: yup
    .string()
    .matches(
      /^[+]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be numeric with at most 2 decimals."
    )
    .required("An annual return rate is required."),
  numberOfYears: yup
    .string()
    .matches(/^[1-9]$|^[1-2]\d$|^30$/, "Enter a whole number between 1 and 30.")
    .required("Please enter the number of years to project into the future."),
  principal: yup
    .string()
    .matches(
      /^[+-]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be numeric with at most 2 decimals."
    )
    .required("Please enter your starting amount."),
  periodsPerYear: yup
    .string()
    .matches(
      /^[1-9]$|^[1-4]\d$|^5[0-2]$/,
      "Enter a whole number between 1 and 52."
    )
    .required("Please enter the number of periods per year."),
  recurringInvestment: yup
    .string()
    .matches(
      /^[+]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Should be a positive number with, at most, 2 decimals."
    )
    .required("Please enter a recurring investment amount."),
  safeWithdrawalRate: yup
    .string()
    .matches(
      /^(?!0)(30(\.0{1,2})?|[12]?\d(\.\d{1,2})?)$/,
      "Must be a value between 1 and 30 with at most 2 decimals."
    )
    .required("A safe withdrawal rate is required."),
  stdDeviation: yup
    .string()
    .matches(
      /^(?:100|\d{1,2})(?:\.\d{1,2})?$/,
      "Must be a value between 0 and 100 with at most 2 decimals."
    )
    .required(
      "A std deviation is required. Enter 0 if you'd like to omit deviation bands."
    ),
});
