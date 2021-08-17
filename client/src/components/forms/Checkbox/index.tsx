import { ErrorMessage, useField } from "formik";

interface CheckboxProps {
  label: string;
  className?: string;
  name: string;
  value: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = "form-group",
  value,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className={className}>
      <div className="form-label">
        <label htmlFor={field.name} className="form-label">
          Additional Fields
        </label>
        <input
          className={`${meta.touched && meta.error && "is-invalid"}`}
          type="checkbox"
          checked={value}
          {...field}
          {...props}
        />{" "}
        &nbsp;&nbsp;
        <span>{label}</span>
      </div>
      <ErrorMessage component="div" name={field.name} className="form-error" />
    </div>
  );
};

export default Checkbox;
