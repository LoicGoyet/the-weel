import {useItems} from '../../../global/ItemsContext';
import DSWheel from '../../designSystem/Wheel';

const Wheel = () => {
  const {items, setItems} = useItems();
  return <DSWheel items={items} onChange={setItems} />;
};

export default Wheel;
