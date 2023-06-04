import * as React from 'react';
import styled from 'styled-components';
import {Item} from '../../../../data/wheel';
import InlineFieldset from '../../../designSystem/InlineFieldset';
import Checkbox from '../../../designSystem/Checkbox';
import Input from '../../../designSystem/Input';
import Button from '../../../designSystem/Button';
import TrashIcon from '../../../icons/TrashIcon';

type Props = {
  item: Item;
  isDrafted: boolean;
  onDraftToggle: (itemId: Item['id']) => void;
  onRemove: (itemId: Item['id']) => void;
  onLabelChange: (itemId: Item['id'], label: string) => void;
};

const ItemFieldset = ({
  item,
  isDrafted,
  onDraftToggle,
  onRemove,
  onLabelChange,
}: Props) => {
  const handleDraftToggle = () => {
    onDraftToggle(item.id);
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onLabelChange(item.id, e.target.value);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onRemove(item.id);
  };

  return (
    <InlineFieldset key={item.id}>
      <CustomCheckbox
        checked={!isDrafted}
        onChange={handleDraftToggle}
        style={{'--accent-color': item.color}}
      />

      <Input value={item.label} onChange={handleLabelChange} />

      <Button onClick={handleRemove} brand='danger' isSquare>
        <TrashIcon width='1em' height='1em' />
      </Button>
    </InlineFieldset>
  );
};

export default ItemFieldset;

const CustomCheckbox = styled(Checkbox)<{style: {'--accent-color': string}}>`
  margin-right: 0.5rem;
`;
