import { useContext } from 'react';
import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from 'react-icons/ai';
import { MainContext } from '../context/MainContext';

function Keyboard() {
  const { dispatch, state } = useContext(MainContext);

  return (
    <div>
      <div
        className={`key ${state.keyDown === 'up' && 'pressed'}`}
        onClick={() => dispatch('go up')}
      >
        <AiOutlineArrowUp />
      </div>
      <div className='d-flex'>
        <div
          className={`key ${state.keyDown === 'left' && 'pressed'}`}
          onClick={() => dispatch('go left')}
        >
          <AiOutlineArrowLeft />
        </div>
        <div
          className={`key ${state.keyDown === 'down' && 'pressed'}`}
          onClick={() => dispatch('go down')}
        >
          <AiOutlineArrowDown />
        </div>
        <div
          className={`key ${state.keyDown === 'right' && 'pressed'}`}
          onClick={() => dispatch('go right')}
        >
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
