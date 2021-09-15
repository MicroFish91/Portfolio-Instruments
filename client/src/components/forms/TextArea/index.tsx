import { ErrorMessage, useField } from "formik";

interface TextAreaProps {
  label: string;
  className?: string;
  name: string;
  type: string;
  placeholder: string;
  rows: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  className = "form-group",
  rows,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className={className}>
      <label htmlFor={field.name} className="form-label">
        {label}
      </label>
      <textarea
        className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
        rows={rows}
        autoComplete="off"
        {...field}
        {...props}
      ></textarea>
      <ErrorMessage component="div" name={field.name} className="form-error" />
    </div>
  );
};

export default TextArea;
