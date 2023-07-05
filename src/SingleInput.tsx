/* eslint-disable @typescript-eslint/no-explicit-any */
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';
import { FormInput } from './MainForm';

interface Props {
  type: string;
  id: string;
  formInput: any;
  setFormInput: React.SetStateAction<any>;
}

const SingleInput: React.FC<Props> = ({
  type,
  id,
  formInput,
  setFormInput,
}) => {
  const handleChange = (e: any) => {
    setFormInput((f: any) => {
      return {
        ...f,
        [e.target.id]: e.target.value,
      };
    });
  };
  const handlePhone = (v: string) => {
    console.log(v);
    setFormInput((f: FormInput) => {
      return {
        ...f,
        phone_number: v,
      };
    });
  };

  console.log(id);
  if (id == 'phone_number') {
    return (
      <div className="md:grid md:grid-cols-2  p-2 flex flex-col">
        <label className="font-bold text-lg" htmlFor={id}>
          {id[0].toUpperCase() + id.slice(1)}
        </label>
        <PhoneInput
          value={formInput[id]}
          onChange={handlePhone}
          limitMaxLength={true}
          international={true}
          defaultCountry="IN"
          id={id}
          className="appearance-none border-violet-400 border-2  [&>*]:outline-none px-2 w-72 "
        />
      </div>
    );
  }

  return (
    <div className="md:grid md:grid-cols-2  p-2 flex flex-col">
      <label className="font-bold text-lg" htmlFor={id}>
        {id[0].toUpperCase() + id.slice(1)}
      </label>

      <input
        type={type}
        id={id}
        className="appearance-none border-violet-400 border-2 outline-none px-2 w-72 "
        value={formInput[id]}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default SingleInput;
