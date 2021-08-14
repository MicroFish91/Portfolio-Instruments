import { ErrorMessage, useField } from "formik";
import { v4 as uuidv4 } from "uuid";

interface SelectFieldProps {
  label: string;
  selectMap: {
    value: string[];
    display: string[];
  };
  name: string;
  type: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  selectMap,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={field.name} className="form-label">
        {label}
      </label>
      <select
        {...field}
        {...props}
        className={`form-control custom-select ${
          meta.touched && meta.error && "is-invalid"
        }`}
      >
        {selectMap.value.map((value, index) => {
          return (
            <option key={uuidv4()} value={value}>
              {selectMap.display[index]}
            </option>
          );
        })}
      </select>

      <ErrorMessage component="div" name={field.name} className="form-error" />
    </div>
  );
};

export default SelectField;
