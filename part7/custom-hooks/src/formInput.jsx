
import useFormField from "./useFormField";

const FormInput = () => {
  const name = useFormField("text");
  const born = useFormField("date");
  const height = useFormField("number");

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
};

export default FormInput;
