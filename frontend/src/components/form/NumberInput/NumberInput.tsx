import { TextInput as FBTextInput, Label, HelperText } from "flowbite-react";

interface NumberInputProps {
  name: string;
  value: number;
  onChange: (s: number) => void;
  label: string;
  placeholder?: string;
  error?: string;
}

function NumberInput({
  name,
  value,
  onChange,
  label,
  placeholder,
  error,
}: NumberInputProps) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} color={error ? 'failure' : 'default'}>{label}</Label>
      </div>
      <FBTextInput
        id={name}
        type="number"
        value={value}
        onChange={(e) => {
          onChange(parseInt(e.target.value));
        }}
        placeholder={placeholder ?? ""}
        color={error ? 'failure' : 'default'}
        shadow
      />
      {error && <HelperText color="failure">{error}</HelperText>}
    </div>
  );
}

export default NumberInput;
