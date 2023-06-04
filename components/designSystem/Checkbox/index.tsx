import * as React from 'react';
import styled from 'styled-components';

type Props = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'type' | 'ref'
>;

const Checkbox = (props: Props) => {
  return <Input type='checkbox' {...props} />;
};

export default Checkbox;

const Input = styled.input`
  --background-color: rgb(255, 255, 255);
  --background-image: none;
  --border-color: rgb(222, 226, 230);
  --size: 1.5rem;
  --accent-color: rgb(13, 110, 253);
  width: var(--size);
  height: var(--size);
  margin-top: 0.25em;
  vertical-align: top;
  background-color: var(--background-color);
  background-image: var(--background-image);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid var(--border-color);
  appearance: none;
  border-radius: 0.25em;
  margin: 0;
  flex-shrink: 0;

  &:focus {
    --border-color: rgb(134, 183, 254);
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(170, 204, 254);
  }

  &:active {
    filter: brightness(90%);
  }

  &:checked {
    --background-color: var(--accent-color);
    --border-color: var(--accent-color);
    --background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
  }
`;
