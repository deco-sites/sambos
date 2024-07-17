import { invoke } from "../runtime.ts";
import { useState } from "preact/hooks";

export interface Form {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

const handleSubmit = async (
  e: Event,
  setSubmitted: (submitted: boolean) => void,
) => {
  e.preventDefault();
  console.log("handleSubmit chamado");

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const data: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    if (key.startsWith("extra")) {
      if (!data.extra) data.extra = [];
      data.extra.push(value);
    } else {
      data[key] = value;
    }
  });

  console.log("form data:", data);

  try {
    const result = await invoke.site.actions.addGuest({
      ...data,
    });
    console.log("Guest added successfully:", result);
    setSubmitted(true);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export default function FormComponent() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div class="flex justify-center px-8 min-h-[50vh]">
      <div class="flex flex-col items-center justify-center w-full md:w-1/2 p-8 lg:px-16 bg-stone-100 rounded-[2.5rem] gap-4">
        {submitted
          ? <div class="text-center text-success">Sucesso!</div>
          : <FormContent setSubmitted={setSubmitted} />}
      </div>
    </div>
  );
}

function FormContent(
  { setSubmitted }: { setSubmitted: (submitted: boolean) => void },
) {
  const [extra, setExtra] = useState<Array<{ name: string }>>([]);

  return (
    <form
      class="w-full flex gap-4 flex-col"
      onSubmit={(e) => handleSubmit(e, setSubmitted)}
    >
      <Field label="nome e sobrenome" name="name" type="text" _class="input" />
      <Field label="email" name="email" type="email" _class="input" />
      <div class="flex flex-col gap-1 w-full my-4">
        <label class="label font-semibold">
          você comparecerá ao casamento?
        </label>
        <div class="flex gap-4 flex-col justify-start">
          <div class="flex items-center gap-2">
            <input
              type="radio"
              name="attending"
              class="radio"
              value="yes"
            />
            <label>sim, comparecerei!</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="radio"
              name="attending"
              class="radio"
              value="no"
            />
            <label>não, infelizmente não poderei comparecer.</label>
          </div>
        </div>
      </div>
      <div class="flex gap-1 flex-col">
        <label class="label font-semibold">
          deseja confirmar a presença de outro convidado?
        </label>
        {extra.length > 0 &&
          (
            <div class="mb-4">
              {extra.map((_extra, i) => (
                <Field
                  key={`extra-${i}`}
                  label={`convidado ${i + 1}`}
                  name={`extra-${i}`}
                  type="text"
                  _class="input"
                />
              ))}
            </div>
          )}
        <button
          class="btn btn-outline w-fit"
          type="button"
          onClick={() => {
            setExtra([...extra, { name: "" }]);
          }}
        >
          adicionar convidado
        </button>
      </div>
      <button
        type="submit"
        class="btn-primary btn w-full mt-8"
      >
        enviar
      </button>
    </form>
  );
}

interface FieldProps {
  label?: string;
  name: string;
  type: string;
  _class?: string;
}

const Field = ({ label, name, type, _class }: FieldProps) => {
  return (
    <div class="flex flex-col justify-start w-full gap-1">
      {label && <label htmlFor={name} class="bold">{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        class={`input border-base-200 rounded-full ${_class}`}
      />
    </div>
  );
};
