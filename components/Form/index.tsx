import {
  addNewItem,
  getIsItemDrafted,
  Item,
  Items,
  removeItem,
  setItemAsDrafted,
  setItemAsUndrafted,
  updateItemLabel,
} from '../../data/wheel';

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

  const handleToggleItemDraft = (itemId: Item['id']) => {
    if (getIsItemDrafted(itemId, items)) {
      onChange(setItemAsUndrafted(itemId, items));
    } else {
      onChange(setItemAsDrafted(itemId, items));
    }
  };

  return (
    <form className={className}>
      {items.allIds.map(itemId => {
        const item = items.byId[itemId] as Item;
        const isItemDrafted = getIsItemDrafted(item.id, items);

        return (
          <fieldset key={item.id}>
            <input
              type='checkbox'
              checked={!isItemDrafted}
              onChange={() => handleToggleItemDraft(item.id)}
            />

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
