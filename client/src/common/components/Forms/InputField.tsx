import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type InputFieldProps = {
  placeholderText: string;
  name?: string;
  className?: string;
  value?: string;
  type?: "text" | "email" | "password" | "number";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iconName?: IconProp;
  error?: string;
};
const InputField = ({
  name,
  type = "text",
  placeholderText,
  value = "",
  iconName,
  onChange,
  className,
  error,
}: InputFieldProps) => {
  return (
    <div className="input-field">
      <div className="input--wrap">
        <input
          className={`form__input ${className && className}`}
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholderText}
          autoComplete={"off"}
        />
        {iconName && (
          <span className="input__icon">
            <FontAwesomeIcon icon={iconName} />
          </span>
        )}
      </div>
      {error && <p className="input__error-message">Error Message</p>}
    </div>
  );
};

export default InputField;
