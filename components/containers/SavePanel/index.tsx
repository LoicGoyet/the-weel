import * as React from 'react';
import SidePanel from '../../designSystem/SidePanel';
import Input from '../../designSystem/Input';
import Label from '../../designSystem/Label';
import Button from '../../designSystem/Button';
import {useSidePanel} from '../../Layout/SidePanelContext';
import styled from 'styled-components';
import {useForm} from './useForm';
import {usePresets} from '../../../global/PresetsContext';
import {useItems} from '../../../global/ItemsContext';

const SavePanel = () => {
  const {updateValue, values, touched, errors, hasErrors, setAllTouched, reset} =
    useForm();
  const {setActivePanel} = useSidePanel();
  const {addNewPreset} = usePresets();
  const {items} = useItems();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateValue('name', e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasErrors) {
      return setAllTouched();
    }
    addNewPreset(values.name, items);
    setActivePanel('items');
    return reset();
  };

  return (
    <SidePanel>
      <SidePanel.Header>
        <SidePanel.Heading>Save</SidePanel.Heading>
      </SidePanel.Header>

      <SidePanel.Body as='form' onSubmit={handleSubmit}>
        <Label htmlFor='name'>Name</Label>
        <Input value={values.name} onChange={handleChange} id='name' />
        {touched.name && errors.name ? <Error>{errors.name}</Error> : null}
        <ActionRow>
          <Button onClick={() => setActivePanel('items')}>Cancel</Button>
          <Button type='submit' brand='primary'>
            Save
          </Button>
        </ActionRow>
      </SidePanel.Body>
    </SidePanel>
  );
};

export default SavePanel;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Error = styled.div`
  margin-top: 0.5rem;
`;
