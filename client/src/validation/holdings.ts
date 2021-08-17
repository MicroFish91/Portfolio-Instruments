import * as yup from "yup";

export const holdingFormSchema = yup.object().shape({
  holdingLocation: yup
    .string()
    .max(40, "Must be 40 characters or less.")
    .required("Holding location is required."),
  holdingTitle: yup
    .string()
    .min(2, "Must be at least two characters long.")
    .max(50, "Must be 50 characters or less.")
    .required("Holding title is required."),
  holdingTicker: yup
    .string()
    .max(10, "Must be 10 characters or less.")
    .required("Holding ticker is required."),
  holdingAmount: yup
    .string()
    .required("Holding amount is required.")
    .max(25, "Amount entered is too large")
    .matches(
      /^[+-]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be numeric with at most 2 decimals."
    ),
  holdingExpenseRatio: yup
    .string()
    .required("Holding expense ratio is required.")
    .matches(/^(0(\.\d+)?|1(\.0+)?)$/, "Must be a decimal between 0 and 1."),
  holdingVP: yup.boolean(),
  accountType: yup.string(),
  assetType: yup.string(),
});
