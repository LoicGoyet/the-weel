import styled from 'styled-components';
import {getTriangleHeight, getTriangleHypotenuse} from '../../utils/math';

type Item = {
  id: string;
  isChecked: boolean;
  label: string;
  color: string;
};

export type Props = {
  className?: string;
  items: {
    byId: Record<string, Item>;
    allIds: Array<string>;
  };
};

const Wheel = ({className, items}: Props) => {
  const length = items.allIds.length;
  const itemAngle = 360 / length;

  const triangleBase = 310;
  const triangleHypotenuse = getTriangleHypotenuse(triangleBase, itemAngle / 2);
  const triangleHeight = getTriangleHeight(triangleBase, triangleHypotenuse);

  return (
    <Wrapper className={className}>
      {items.allIds.map((itemId, index) => {
        const item = items.byId[itemId] as Item;
        const degPosition = (itemAngle * (index + 1) - itemAngle) * -1;

        return (
          <Item
            key={item.id}
            style={{
              '--color': item.color,
              '--rotate': `${degPosition}deg`,
              '--triangle-base': `${triangleBase}px`,
              '--triangle-height': `${triangleHeight}px`,
            }}
          >
            <ItemLabel>{item.label}</ItemLabel>
          </Item>
        );
      })}
    </Wrapper>
  );
};

export default Wheel;

const Wrapper = styled.ul`
  aspect-ratio: 1 / 1;
  max-width: 600px;
  border-radius: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
  border: max(0.75vw, 6px) solid white;
`;

const Item = styled.li<{
  style: {
    '--color': string;
    '--rotate': `${number}deg`;
    '--triangle-base': `${number}px`;
    '--triangle-height': `${number}px`;
  };
}>`
  display: block;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) rotate(var(--rotate, 0deg));
  transform-origin: left center;

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

const ItemLabel = styled.span`
  width: 100%;
  display: block;
  background-color: var(--color);
  font-size: max(1vw, 14px);
  line-height: 4px;
  text-align: right;
  padding: 0 10%;
`;
