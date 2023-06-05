import * as React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
  value: React.InputHTMLAttributes<HTMLInputElement>['value'];
  onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
  id?: string;
};

const Input = ({className, type = 'text', ...rest}: Props) => {
  return <Wrapper className={className} type={type} {...rest} />;
};

export default Input;

const Wrapper = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background-color: rgb(255, 255, 255);
  background-clip: padding-box;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25em;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(170, 204, 254);
  }
`;
