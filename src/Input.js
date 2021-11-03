import clsx from "clsx";

export default function Input(props) {
  const { placeholder, type = "text", className, required, ...rest } = props;
  const classNames = clsx({
    "input": true
  }, className);

  return (
    <label className="label">
      {placeholder}
      {required && <span className="input-required">*</span>}
      <div>
        <input
          className={classNames}
          type={type}
          placeholder={placeholder}
          required={required}
          {...rest}
        />
      </div>
    </label>
  );
}