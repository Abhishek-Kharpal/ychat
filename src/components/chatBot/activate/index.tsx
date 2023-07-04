import { useContext } from 'react';
import { ActivateContext } from '../../../contexts/activate';
import { buttonHeading } from './constants';

const Activate = () => {
  const { activate, setActivate } = useContext(ActivateContext);
  const handleClick = () => {
    setActivate(!activate);
  };
  return (
    <div>
      <button onClick={handleClick}>{buttonHeading[activate ? 1 : 0]}</button>
    </div>
  );
};

export default Activate;
