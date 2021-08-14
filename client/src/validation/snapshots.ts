import * as yup from "yup";

export const snapshotFormSchema = yup.object().shape({
  snapshotTitle: yup
    .string()
    .max(30, "Must be 30 characters or less.")
    .required("Snapshot title is required."),
  snapshotDate: yup
    .date()
    .max(new Date(), "Only past or present dates are permitted.")
    .required("Please specify your snapshot date."),
  snapshotNotes: yup.string().max(255, "Must be 255 characters or less."),
});
