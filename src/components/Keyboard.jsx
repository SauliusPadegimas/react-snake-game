import { useContext } from 'react';
import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from 'react-icons/ai';
import { MainContext } from '../context/MainContext';

function Keyboard() {
  const { dispatch } = useContext(MainContext);

  return (
    <div>
      <div className='key' onClick={() => dispatch('go up')}>
        <AiOutlineArrowUp />
      </div>
      <div className='d-flex'>
        <div className='key' onClick={() => dispatch('go left')}>
          <AiOutlineArrowLeft />
        </div>
        <div className='key' onClick={() => dispatch('go down')}>
          <AiOutlineArrowDown />
        </div>
        <div className='key' onClick={() => dispatch('go right')}>
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
