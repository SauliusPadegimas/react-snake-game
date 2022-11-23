import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { GiSnakeBite, GiSeatedMouse } from 'react-icons/gi';

function Box({ x, y }) {
  const [takenBy, setTakenBy] = useState(null);
  const { state } = useContext(MainContext);
  useEffect(() => {
    setTakenBy(null);
    if (x === state.food.x && y === state.food.y) {
      setTakenBy('box--food');
    }

    state.snake.forEach((box) => {
      if (x === box.x && y === box.y) {
        setTakenBy('box--snake');
      }
    });

    if (x === state.snake[0].x && y === state.snake[0].y) {
      setTakenBy('box--head');
    }
  }, [state, x, y]);
  return (
    <div className={`game__box ${takenBy}`}>
      {takenBy === 'box--head' && <GiSnakeBite />} {takenBy === 'box--food' && <GiSeatedMouse />}
    </div>
  );
}

export default Box;
