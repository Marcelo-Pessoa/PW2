import { useEffect, useRef } from "react";
import { TextInput as FBTextInput, HelperText, Label } from "flowbite-react";

interface TextInputProps {
  name: string;
  value: string;
  onChange: (s: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
  focus?: boolean;
}

function TextInput({
  name,
  value,
  onChange,
  label,
  placeholder,
  error,
  focus,
}: TextInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focus) ref.current?.focus();
  }, [focus]);
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} color={error ? "failure" : "default"}>
          {label}
        </Label>
      </div>
      <FBTextInput
        id={name}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder ?? ""}
        color={error ? "failure" : "default"}
        shadow
      />
      {error && <HelperText color="failure">{error}</HelperText>}
    </div>
  );
}

export default TextInput;
