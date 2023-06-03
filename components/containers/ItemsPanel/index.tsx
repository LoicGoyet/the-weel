import React from 'react';
import {
  addNewItem,
  getIsItemDrafted,
  Item,
  removeItem,
  setItemAsDrafted,
  setItemAsUndrafted,
  updateItemLabel,
} from '../../../data/wheel';
import {useItems} from '../../../global/ItemsContext';
import SidePanel from '../../designSystem/SidePanel';
import {useSidePanel} from '../../Layout/SidePanelContext';

const ItemsPanel = () => {
  const {items, setItems} = useItems();
  const {setActivePanel} = useSidePanel();

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

  return (
    <SidePanel>
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
        <button type='button' onClick={() => setActivePanel('presets')}>
          Save preset
        </button>
      </form>
    </SidePanel>
  );
};

export default ItemsPanel;
