import { ErrorMessage, useField } from "formik";

interface TextFieldProps {
  label: string;
  name: string;
  type: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={field.name} className="form-label">
        {label}
      </label>
      <input
        className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="form-error" />
    </div>
  );
};

export default TextField;
