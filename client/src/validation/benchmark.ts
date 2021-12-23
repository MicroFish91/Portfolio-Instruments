import * as yup from "yup";

export const customBenchmarkAssetSchema = yup.object().shape({
  assetTitle: yup.string(),
  assetPercentage: yup
    .string()
    .matches(/^\+?(0|[1-9]\d*)$/, "Should be a positive whole integer.")
    .required("An asset percentage is required."),
});

export const customBenchmarkFormSchema = yup.object().shape({
  benchmarkTitle: yup.string().required("A benchmark title is required."),
  benchmarkShortDescription: yup
    .string()
    .max(50, "Benchmark short description is too long."),
  benchmarkLongDescription: yup
    .string()
    .max(100, "Benchmark long description is too long."),
  benchmarkCAGR: yup
    .string()
    .matches(
      /^[+-]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be numeric with at most 2 decimals."
    ),
  benchmarkStdDev: yup
    .string()
    .matches(
      /^[+-]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be numeric with at most 2 decimals."
    ),
  benchmarkWorstDrawdown: yup
    .string()
    .matches(
      /^[+-]?[0-9]{1,9}(?:\.[0-9]{0,2})?$/,
      "Incorrect format, should be numeric with at most 2 decimals."
    ),
  benchmarkLongestDrawdown: yup
    .string()
    .matches(/^\+?(0|[1-9]\d*)$/, "Should be a positive whole integer."),
});
