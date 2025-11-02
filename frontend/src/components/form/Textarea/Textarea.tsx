import { Textarea as FBTextarea, Label, HelperText } from "flowbite-react";

interface TextareaProps {
  name: string;
  value: string;
  onChange: (s: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
  rows?: number;
}

function Textarea({
  name,
  value,
  onChange,
  label,
  placeholder,
  error,
  rows,
}: TextareaProps) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} color={error ? 'failure' : 'default'}>{label}</Label>
      </div>
      <FBTextarea
        id={name}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder ?? ""}
        color={error ? 'failure' : 'default'}
        rows={rows ?? 4}
        shadow
      >
        {value}
      </FBTextarea>
      {error && <HelperText color="failure">{error}</HelperText>}
    </div>
  );
}

export default Textarea;
