interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled,
  required,
  helperText,
}: FormInputProps) => (
  <label className="flex flex-col gap-1">
    <span className="text-tertiary text-xs">{label}</span>
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="border-tertiary/20 text-primary focus:border-primary rounded-md border bg-transparent px-3 py-2 text-sm transition-colors outline-none disabled:opacity-50"
      placeholder={placeholder}
      type={type}
      required={required}
      disabled={disabled}
    />
    {helperText && <span className="text-tertiary text-xs">{helperText}</span>}
  </label>
);

export default FormInput;
