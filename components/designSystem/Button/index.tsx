import * as React from 'react';
import styled from 'styled-components';

// type Brand = Record<
//   string,
//   {
//     backgroundColor: string;
//     color: string;
//     outlineColor: string;
//   }
// >;

const brands = {
  danger: {
    backgroundColor: 'rgb(220, 53, 69)',
    color: 'rgb(255, 255, 255)',
    outlineColor: 'rgb(241, 174, 181)',
  },
} as const;

type Props = {
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  children: React.ReactNode;
  brand: keyof typeof brands;
  isSquare?: boolean;
};

const Button = ({
  className,
  type = 'button',
  children,
  onClick,
  brand,
  isSquare = false,
}: Props) => {
  return (
    <Wrapper
      className={className}
      type={type}
      onClick={onClick}
      style={{
        '--background-color': brands[brand].backgroundColor,
        '--color': brands[brand].color,
        '--outline-color': brands[brand].outlineColor,
        '--padding': isSquare ? '0.375rem' : '0.375rem 0.75rem',
        '--width': isSquare ? '2.25rem' : 'auto',
        '--height': isSquare ? '2.25rem' : 'auto',
      }}
    >
      {children}
    </Wrapper>
  );
};

export default Button;

export const Wrapper = styled.button<{
  style: {
    '--background-color': string;
    '--color': string;
    '--outline-color': string;
    '--padding': string;
    '--width': string;
    '--height': string;
  };
}>`
  padding: var(--padding);
  width: var(--width);
  height: var(--height);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border: none;
  background-clip: padding-box;
  appearance: none;
  border-radius: 0.25em;
  cursor: pointer;
  background-color: var(--background-color);
  color: var(--color);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(85%);
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem var(--outline-color);
  }
`;
