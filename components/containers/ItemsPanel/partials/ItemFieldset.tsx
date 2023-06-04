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
  shouldRenderRemoveButton: boolean;
};

const ItemFieldset = ({
  item,
  isDrafted,
  onDraftToggle,
  onRemove,
  onLabelChange,
  shouldRenderRemoveButton,
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
      <DraftCheckbox
        checked={!isDrafted}
        onChange={handleDraftToggle}
        style={{'--accent-color': item.color}}
      />

      <LabelInput value={item.label} onChange={handleLabelChange} />

      {shouldRenderRemoveButton ? (
        <RemoveButton onClick={handleRemove} brand='danger' isSquare>
          <TrashIcon width='0.9rem' height='0.9rem' />
        </RemoveButton>
      ) : null}
    </InlineFieldset>
  );
};

export default ItemFieldset;

const DraftCheckbox = styled(Checkbox)<{style: {'--accent-color': string}}>`
  margin-right: 1rem;
`;

const LabelInput = styled(Input)`
  &:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const RemoveButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
