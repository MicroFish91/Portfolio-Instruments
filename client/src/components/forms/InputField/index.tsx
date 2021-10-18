import { ErrorMessage, useField } from "formik";
import { ChangeEvent, SyntheticEvent } from "react";

interface TextFieldProps {
  label: string;
  className?: string;
  name: string;
  type: string;
  placeholder: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
}

const TextField: React.FC<TextFieldProps> = ({
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
