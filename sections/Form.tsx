export interface Form {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export default function Form() {
  return (
    <div class="w-full flex justify-center p-8">
      <div class="flex flex-col items-center justify-center w-1/2 p-8 px-16 bg-zinc-100 rounded-[2.5rem] gap-4">
        <Field label="Nome" type="input" />
        <Field label="Email" type="input" />
        <button class="btn-primary btn w-full mt-8">Enviar</button>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  type: string;
}

const Field = ({ label, type }: FieldProps) => {
  return (
    <div class="flex flex-col justify-start w-full gap-1">
      <label for={label}>{label}</label>
      <input
        id={label}
        type={type}
        class="input border-base-200 rounded-full"
      />
    </div>
  );
};
