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
import ItemFieldset from './partials/ItemFieldset';

const ItemsPanel = () => {
  const {items, setItems} = useItems();
  const {setActivePanel} = useSidePanel();

  const handleLabelChange = (itemId: Item['id'], value: string) => {
    setItems(updateItemLabel(value, itemId, items));
  };

  const handleAddItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems(addNewItem(items));
  };

  const handleItemRemove = (itemId: Item['id']) => {
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
      <SidePanel.Header>
        <SidePanel.Heading>Configuration</SidePanel.Heading>
      </SidePanel.Header>

      <SidePanel.Body as='form'>
        {items.allIds.map(itemId => {
          const item = items.byId[itemId] as Item;
          const isItemDrafted = getIsItemDrafted(item.id, items);

          return (
            <ItemFieldset
              key={item.id}
              item={item}
              isDrafted={isItemDrafted}
              onDraftToggle={handleToggleItemDraft}
              onLabelChange={handleLabelChange}
              onRemove={handleItemRemove}
            />
          );
        })}

        <button type='button' onClick={handleAddItemClick}>
          Add item
        </button>
        <button type='button' onClick={() => setActivePanel('presets')}>
          Save preset
        </button>
      </SidePanel.Body>
    </SidePanel>
  );
};

export default ItemsPanel;
