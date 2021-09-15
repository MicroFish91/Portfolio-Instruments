import { ErrorMessage, useField } from "formik";

interface DateFieldProps {
  label: string;
  className?: string;
  name: string;
  placeholder: string;
}

const DateField: React.FC<DateFieldProps> = ({
  label,
  className = "form-group",
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className={className}>
      <label htmlFor={field.name} className="form-label">
        {label}
      </label>
      <input
        className={`form-control fc-datepicker ${
          meta.touched && meta.error && "is-invalid"
        }`}
        type="date"
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="form-error" />
    </div>
  );
};

export default DateField;
