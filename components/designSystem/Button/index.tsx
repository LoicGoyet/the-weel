import * as React from 'react';
import styled from 'styled-components';

const brands = {
  default: {
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(0, 0, 0)',
    outlineColor: 'rgb(158, 197, 254)',
  },
  primary: {
    backgroundColor: 'rgb(13, 110, 253)',
    color: 'rgb(255, 255, 255)',
    outlineColor: 'rgb(158, 197, 254)',
  },
  danger: {
    backgroundColor: 'rgb(220, 53, 69)',
    color: 'rgb(255, 255, 255)',
    outlineColor: 'rgb(241, 174, 181)',
  },
  warning: {
    backgroundColor: 'rgb(255, 193, 7)',
    color: 'rgb(0, 0, 0)',
    outlineColor: 'rgb(255, 230, 156)',
  },
  transparent: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: 'currentColor',
    outlineColor: 'rgb(158, 197, 254)',
  },
} as const;

type Props = {
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  children: React.ReactNode;
  brand?: keyof typeof brands;
  isSquare?: boolean;
  size?: 'md' | 'lg';
};

const getStaticSize = (size: 'md' | 'lg', isSquare: boolean) => {
  if (!isSquare) return 'auto';
  return size === 'md' ? '2.25rem' : '3rem';
};

const getPaddingY = (size: 'md' | 'lg') => {
  return size === 'md' ? '0.375rem' : '0.5rem';
};

const getPaddingX = (size: 'md' | 'lg', isSquare: boolean) => {
  if (isSquare) return getPaddingY(size);
  return size === 'md' ? '0.75rem' : '1rem';
};

const Button = ({
  className,
  type = 'button',
  children,
  onClick,
  brand = 'default',
  isSquare = false,
  size = 'md',
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
        '--padding-x': getPaddingX(size, isSquare),
        '--padding-y': getPaddingY(size),
        '--width': getStaticSize(size, isSquare),
        '--height': getStaticSize(size, isSquare),
        '--line-height': size === 'md' ? '1.5' : '2',
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
    '--padding-x': string;
    '--padding-y': string;
    '--width': string;
    '--height': string;
    '--line-height': string;
  };
}>`
  padding: var(--padding-y) var(--padding-x);
  width: var(--width);
  height: var(--height);
  font-size: 1rem;
  font-weight: 400;
  line-height: var(--line-height);
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
