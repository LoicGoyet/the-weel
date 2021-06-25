import styled from 'styled-components';
import {getIndexOfLastDrafted, Item, Items} from '../../data/wheel';
import {pickRandomFromArr, removeItemFromArray} from '../../utils/array';
import {getTriangleHeight, getTriangleHypotenuse} from '../../utils/math';

export type Props = {
  className?: string;
  items: Items;
  onChange: (items: Items) => void;
};

const getNumberOfLaps = (items: Items) => {
  const completeLaps = items.draftedIds.length * 10;
  const lastDraftedIndex = getIndexOfLastDrafted(items);

  if (lastDraftedIndex <= 0) {
    return completeLaps;
  }

  const partialLap = lastDraftedIndex / items.allIds.length;
  return completeLaps + partialLap;
};

const Wheel = ({className, items, onChange}: Props) => {
  const length = items.allIds.length;
  const itemAngle = 360 / length;

  const triangleBase = 310;
  const triangleHypotenuse = getTriangleHypotenuse(triangleBase, itemAngle / 2);
  const triangleHeight = getTriangleHeight(triangleBase, triangleHypotenuse);

  const numberOfLaps = getNumberOfLaps(items);

  console.log({items, numberOfLaps});

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const itemDrafted = pickRandomFromArr<Item['id']>(items.undraftedIds);
    onChange({
      ...items,
      draftedIds: [...items.draftedIds, itemDrafted],
      undraftedIds: removeItemFromArray<Item['id']>(itemDrafted, items.undraftedIds),
    });
  };

  return (
    <Wrapper>
      <Button onClick={handleClick} type='button'>
        Turn
      </Button>
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
                '--color': isItemDrafted ? 'rgb(var(--grey-4))' : item.color,
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
    </Wrapper>
  );
};

export default Wheel;

const Wrapper = styled.div`
  aspect-ratio: 1 / 1;
  max-width: 600px;
  position: relative;
`;

const List = styled.ul`
  border-radius: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: max(0.75vw, 6px) solid white;
  margin: 0;
  position: relative;
`;

const ListItem = styled.li<{
  style: {
    '--color': string;
    '--rotate': `calc(${number}deg + ${number}deg)`;
    '--triangle-base': `${number}px`;
    '--triangle-height': `${number}px`;
  };
}>`
  --spining-duration: 4.5s;

  display: block;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) rotate(var(--rotate, 0deg));
  transform-origin: left center;
  transition: transform var(--spining-duration) ease-out;

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
    transition: border-color 200ms ease-in-out;
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
  text-align: right;
  padding: 0 10%;
  transition: background-color 200ms ease-in-out;
  transition-delay: var(--spining-duration);
`;

const Button = styled.button`
  --box-shadow: 0 0 6px 2px rgba(var(--grey-6), 0.3);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  appearance: none;
  width: max(12%, 2.5rem);
  aspect-ratio: 1 / 1;
  border-radius: 100%;
  border: 0;
  background-color: rgb(var(--white));
  box-shadow: var(--box-shadow);

  &:focus {
    box-shadow: 0 0 0 4px rgb(var(--focus-color)), var(--box-shadow);
    outline: 0;
  }
`;
