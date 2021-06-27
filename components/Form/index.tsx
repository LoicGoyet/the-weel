import {addNewItem, Item, Items, removeItem, updateItemLabel} from '../../data/wheel';

export type Props = {
  className?: string;
  items: Items;
  onChange: (items: Items) => void;
};

const Form = ({className, items, onChange}: Props) => {
  const handleLabelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: Item['id'],
  ) => {
    e.preventDefault();
    onChange(updateItemLabel(e.target.value, itemId, items));
  };

  const handleAddItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange(addNewItem(items));
  };

  const handleRemoveItemClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemId: Item['id'],
  ) => {
    e.preventDefault();
    onChange(removeItem(itemId, items));
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
              onChange={e => handleLabelChange(e, item.id)}
            />
            <button type='button' onClick={e => handleRemoveItemClick(e, item.id)}>
              remove
            </button>
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
