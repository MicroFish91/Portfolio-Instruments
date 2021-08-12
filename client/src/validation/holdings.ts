import * as yup from "yup";

export const holdingFormSchema = yup.object().shape({
  holdingLocation: yup.string().required("Holding location is required."),
  holdingAmount: yup
    .string()
    .required("Holding amount is required.")
    .matches(
      /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
      "Numeric values are required."
    ),
  accountType: yup.string(),
  assetType: yup.string(),
});
