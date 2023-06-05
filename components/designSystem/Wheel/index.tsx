import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
  areAllItemsPicked,
  Item,
  Items,
  pickItem,
  resetItemsPicks,
} from '../../../data/wheel';
import {getTriangleHeight, getTriangleHypotenuse} from '../../../utils/math';
import {getNumberOfLaps} from './utils/getNumberOfLaps';

export type Props = {
  className?: string;
  items: Items;
  onChange: (items: Items) => void;
};

const spinningDurationMs = 2500;

const Wheel = ({className, items, onChange}: Props) => {
  const [isSpining, setIsSpining] = useState(false);

  const length = items.allIds.length;
  const itemAngle = 360 / length;

  const triangleBase = 310;
  const triangleHypotenuse = getTriangleHypotenuse(triangleBase, itemAngle / 2);
  const triangleHeight = getTriangleHeight(triangleBase, triangleHypotenuse);

  const shouldDisplayPickButton = !areAllItemsPicked(items);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpining(false);
    }, spinningDurationMs);

    return () => clearTimeout(timer);
  }, [isSpining, setIsSpining]);

  const handlePickClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedItems = pickItem(items);
    setIsSpining(!!updatedItems.draftedIds.length);
    onChange(updatedItems);
  };

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange(resetItemsPicks(items));
  };

  return (
    <Wrapper
      style={{
        '--spining-duration': isSpining ? `${spinningDurationMs}ms` : '0ms',
      }}
    >
      <ButtonWrapper>
        <Button
          onClick={shouldDisplayPickButton ? handlePickClick : handleResetClick}
          type='button'
          disabled={isSpining}
        >
          {shouldDisplayPickButton ? 'Turn' : 'Reset'}
        </Button>
      </ButtonWrapper>

      <List className={className}>
        {items.allIds.map((itemId, index) => {
          const item = items.byId[itemId] as Item;
          const initialDegPosition = (itemAngle * (index + 1) - itemAngle) * -1;
          const lapsDegPosition = getNumberOfLaps(items) * 360;
          const isItemDrafted = items.draftedIds.includes(item.id);

          return (
            <ListItem
              key={item.id}
              style={{
                '--color': isItemDrafted ? 'rgb(var(--bg-color-1))' : item.color,
                '--rotate': `calc(${initialDegPosition}deg + ${lapsDegPosition}deg)`,
                '--triangle-base': `${triangleBase}px`,
                '--triangle-height': `${triangleHeight}px`,
              }}
            >
              <ListItemLabel>{item.label}</ListItemLabel>
            </ListItem>
          );
        })}
      </List>

      <LightWrapper>
        <Indicator />
      </LightWrapper>
    </Wrapper>
  );
};

export default Wheel;

const Wrapper = styled.div<{
  style: {
    '--spining-duration': `${string}ms`;
  };
}>`
  --border-width: clamp(0.5rem, 1.25vw, 1.25rem);
  --bg-color: rgb(var(--white));

  aspect-ratio: 1 / 1;
  max-width: 600px;
  position: relative;
  border-radius: 100%;
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.15);
`;

const List = styled.ul`
  border-radius: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: var(--border-width) solid var(--bg-color);
  margin: 0;
  position: relative;
  background-color: var(--bg-color);
`;

const ListItem = styled.li<{
  style: {
    '--color': string;
    '--rotate': `calc(${number}deg + ${number}deg)`;
    '--triangle-base': `${number}px`;
    '--triangle-height': `${number}px`;
  };
}>`
  display: block;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) rotate(var(--rotate, 0deg))
    translateX(calc(var(--border-width) / 4));
  transform-origin: left center;
  transition: transform var(--spining-duration) cubic-bezier(0.05, 0.25, 0.31, 1.01);

  &::before,
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    border-style: solid;
    z-index: -1;
    transition-delay: var(--spining-duration);
  }

  &::before {
    border-width: 0 0 var(--triangle-height) var(--triangle-base);
    border-color: transparent transparent var(--color) transparent;
    bottom: 50%;
  }

  &::after {
    border-width: 0 var(--triangle-base) var(--triangle-height) 0;
    border-color: transparent var(--color) transparent transparent;
    top: 50%;
  }
`;

const ListItemLabel = styled.span`
  width: 100%;
  display: block;
  background-color: var(--color);
  font-size: max(1vw, 14px);
  line-height: 4px;
  min-height: 4px;
  text-align: right;
  padding: 0 10%;
  transition-delay: var(--spining-duration);
  user-select: none;
`;

const ButtonWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max(9%, 2.5rem);
  aspect-ratio: 1 / 1;
  border-radius: 100%;
  background-color: var(--bg-color);
  z-index: 1;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  appearance: none;
  border: 0;
  border-radius: 100%;
  background-color: var(--bg-color);
  user-select: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: 0;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }
`;

const LightWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  height: calc(100% - var(--border-width));
  width: calc(100% - var(--border-width));
  transform: translate(-50%, -50%);
`;

const Indicator = styled.span`
  --bg-color: rgb(var(--grey-2));
  position: absolute;
  height: calc(var(--border-width) + 10px);
  width: calc(var(--border-width) + 10px);
  border-radius: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-left: 50%;
  margin-top: 0%;
  z-index: 1;
  background-color: var(--bg-color);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    display: block;
    height: 70.7106781187%;
    width: 70.7106781187%;
    height: 50%;
    width: 50%;
    position: absolute;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: var(--bg-color);
    top: 50%;
    left: 15%;
  }
`;
