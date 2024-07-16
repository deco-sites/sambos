export interface Form {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export default function Form() {
  return (
    <div class="flex flex-col items-center justify-center w-1/3">
      <Field label="Nome" type="input" />
      <Field label="Email" type="input" />
    </div>
  );
}

interface FieldProps {
  label: string;
  type: string;
}

const Field = ({ label, type }: FieldProps) => {
  return (
    <div class="flex flex-col justify-start w-full">
      <label for={label}>{label}</label>
      <input id={label} type={type} />
    </div>
  );
};
