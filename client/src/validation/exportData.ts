import * as yup from "yup";

export const exportDataSchema = yup.object().shape({
  exportDataLength: yup
    .string()
    .matches(/^\+?(0|[1-9]\d*)$/, "Should be a positive whole integer.")
    .max(3, "The input you entered is too long.")
    .required("Export data length is required."),
});
