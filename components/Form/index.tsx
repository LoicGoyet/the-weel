import {v4 as uuidv4} from 'uuid';

import {Item, Items} from '../../data/wheel';

export type Props = {
  className?: string;
  items: Items;
  onChange: (items: Items) => void;
};

const Form = ({className, items, onChange}: Props) => {
  const handleInputChange =
    (itemId: Item['id'], property: 'label' | 'color') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      onChange({
        ...items,
        byId: {
          ...items.byId,
          [itemId]: {
            ...items.byId[itemId],
            [property]: e.target.value,
          },
        },
      });
    };

  const handleAddItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newItemId = uuidv4();

    onChange({
      ...items,
      byId: {
        ...items.byId,
        [newItemId]: {
          id: newItemId,
          label: '',
          color: '',
        },
      },
      allIds: [...items.allIds, newItemId],
      undraftedIds: [...items.undraftedIds, newItemId],
    });
  };

  return (
    <form className={className}>
      {items.allIds.map(itemId => {
        const item = items.byId[itemId] as Item;

        return (
          <fieldset key={item.id}>
            <input
              type='text'
              value={item.label}
              onChange={handleInputChange(item.id, 'label')}
            />
            <input
              type='color'
              value={item.color}
              onChange={handleInputChange(item.id, 'color')}
            />
          </fieldset>
        );
      })}
      <button type='button' onClick={handleAddItemClick}>
        Add item
      </button>
    </form>
  );
};

export default Form;
