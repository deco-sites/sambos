export interface Form {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

const handleSubmit = (e: any) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
};

export default function Form() {
  return (
    <form class="w-full flex justify-center p-8" onSubmit={handleSubmit}>
      <div class="flex flex-col items-center justify-center w-full lg:w-1/2 p-8 lg:px-16 bg-stone-100 rounded-[2.5rem] gap-4">
        <Field label="nome" name="name" type="text" _class="input" />
        <Field label="email" name="email" type="email" _class="input" />
        <div class="flex flex-col gap-2 w-full">
          <label class="label">você comparecerá ao casamento?</label>
          <div class="flex gap-4 flex-col justify-start">
            <div class="flex items-center gap-2">
              <input
                type="radio"
                name="attendance"
                class="radio"
                value="yes"
                defaultChecked
              />
              <label>sim, comparecerei.</label>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="radio"
                name="attendance"
                class="radio"
                value="no"
              />
              <label>não, infelizmente não poderei comparecer.</label>
            </div>
          </div>
        </div>
        <button class="btn-primary btn w-full mt-8" type="submit">
          enviar
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  _class?: string;
}

const Field = ({ label, name, type, _class }: FieldProps) => {
  return (
    <div class="flex flex-col justify-start w-full gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        class={`input border-base-200 rounded-full ${_class}`}
      />
    </div>
  );
};
