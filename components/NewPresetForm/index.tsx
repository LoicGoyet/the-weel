import React from 'react';
import {useForm} from './useForm';

type Props = {
  onSubmit: (name: string) => void;
};

const NewPresetForm = ({onSubmit}: Props) => {
  const {updateValue, values, touched, errors, hasErrors, setAllTouched, reset} =
    useForm();
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateValue('name', e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasErrors) {
      return setAllTouched();
    }
    onSubmit(values.name);
    return reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={values.name} onChange={handleNameChange} />
      {touched.name && errors.name ? <div>{errors.name}</div> : null}
      <button type='submit'>Save this preset</button>
    </form>
  );
};

export default NewPresetForm;
