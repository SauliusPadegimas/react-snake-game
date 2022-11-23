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
    }, 500);
    return () => clearInterval(interval);
  }, [state.direction, state.gameover]);

  function handleKeyDown(e) {
    console.log('e.target ===', e.key);
    switch (e.key) {
      case 'ArrowDown':
        dispatch('go down');
        break;
      case 'ArrowUp':
        dispatch('go up');
        break;
      case 'ArrowLeft':
        dispatch('go left');
        break;
      case 'ArrowRight':
        dispatch('go right');
        break;

      default:
        break;
    }
  }

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <div tabIndex={3} onKeyDown={handleKeyDown}>
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
      </div>
    </MainContext.Provider>
  );
}

export default App;
