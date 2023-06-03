import React from 'react';
import {
  addNewItem,
  getIsItemDrafted,
  Item,
  Items,
  removeItem,
  setItemAsDrafted,
  setItemAsUndrafted,
  updateItemLabel,
} from '../../../data/wheel';
import NewPresetForm from '../../NewPresetForm';
import LoadPresetForm from '../../LoadPresetForm';
import {setPreset} from '../../../services/setPreset';
import {useItems} from '../../../global/ItemsContext';

const Form = () => {
  const {items, setItems} = useItems();

  const handleLabelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: Item['id'],
  ) => {
    e.preventDefault();
    setItems(updateItemLabel(e.target.value, itemId, items));
  };

  const handleAddItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems(addNewItem(items));
  };

  const handleRemoveItemClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemId: Item['id'],
  ) => {
    e.preventDefault();
    setItems(removeItem(itemId, items));
  };

  const handleToggleItemDraft = (itemId: Item['id']) => {
    if (getIsItemDrafted(itemId, items)) {
      setItems(setItemAsUndrafted(itemId, items));
    } else {
      setItems(setItemAsDrafted(itemId, items));
    }
  };

  const handlePresetSubmit = (name: string) => {
    setPreset(name, items);
  };

  const handleLoadPresetSubmit = (items: Items) => {
    setItems(items);
  };

  return (
    <React.Fragment>
      <form>
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
        <button type='button'>Save preset</button>
      </form>

      <NewPresetForm onSubmit={handlePresetSubmit} />
      <LoadPresetForm onSubmit={handleLoadPresetSubmit} />
    </React.Fragment>
  );
};

export default Form;
