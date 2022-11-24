import { useEffect, useReducer } from 'react';
import Box from './components/Box';
import { SnakeReducer, initialState } from './context/SnakeReducer';
import { fieldsArr } from './db/fields';
import { MainContext } from './context/MainContext';
import Keyboard from './components/Keyboard';

function App() {
  const [state, dispatch] = useReducer(SnakeReducer, initialState);

  useEffect(() => {
    dispatch('restart');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!state.gameover) {
        dispatch(state.direction);
      }
    }, state.speed);
    return () => clearInterval(interval);
  }, [state.direction, state.gameover]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'ArrowDown' && !state.gameover) {
        event.preventDefault();
        dispatch('go down');
        dispatch('keydown down');
      }
      if (event.key === 'ArrowUp' && !state.gameover) {
        event.preventDefault();
        dispatch('go up');
        dispatch('keydown up');
      }
      if (event.key === 'ArrowLeft' && !state.gameover) {
        event.preventDefault();
        dispatch('go left');
        dispatch('keydown left');
      }
      if (event.key === 'ArrowRight' && !state.gameover) {
        event.preventDefault();
        dispatch('go right');
        dispatch('keydown right');
      }
    };

    const keyUpHandler = () => {
      dispatch('keyup');
    };

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [state.gameover]);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <div className='d-flex game__container'>
        <div className='controls'>
          {!state.gameover && <Keyboard />}
          {state.gameover && <h1 className='gameover'>Game Over</h1>}
          <h1>Score: {state.score}</h1>
          {state.gameover && (
            <button className='button' onClick={() => dispatch('restart')}>
              RESTART
            </button>
          )}
        </div>

        <div className='board'>
          {fieldsArr.map((box, i) => (
            <Box x={box.x} y={box.y} key={i} />
          ))}
        </div>
      </div>
    </MainContext.Provider>
  );
}

export default App;
