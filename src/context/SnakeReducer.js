import getFoodCoord from './getFoodCoord';

const initialState = {
  snake: [{ x: null, y: null }],
  food: { x: null, y: null },
  score: 0,
  direction: null,
  gameover: false,
};

function SnakeReducer(state, action) {
  switch (action) {
    case 'restart':
      const snakeX = Math.floor(Math.random() * 10);
      const snakeY = Math.floor(Math.random() * 10);
      // funkcija, kuri sugeneruoja koordinated, kurios nebus lygios paduotom i parametrus
      const { foodX, foodY } = getFoodCoord([{ x: snakeX, y: snakeY }]);
      return {
        ...initialState,
        snake: [{ x: snakeX, y: snakeY }],
        food: { x: foodX, y: foodY },
      };
    case 'go up':
      // tikrina ar nepriejo sienos krasto
      if (state.snake[0].y === 0) {
        return { ...state, gameover: true };
      }
      //tikrina ar suvalge
      if (state.food.x === state.snake[0].x && state.food.y === state.snake[0].y - 1) {
        const { foodX, foodY } = getFoodCoord(state.snake);
        return {
          food: { x: foodX, y: foodY },
          score: state.score + 1,
          snake: [{ x: state.snake[0].x, y: state.snake[0].y - 1 }, ...state.snake],
          direction: 'go up',
        };
      }
      // jei nesuvalge
      else {
        const newArr = [{ x: state.snake[0].x, y: state.snake[0].y - 1 }, ...state.snake];
        newArr.pop();
        return {
          ...state,
          snake: newArr,
          direction: 'go up',
        };
      }
    case 'go left':
      // tikrina ar nepriejo sienos krasto
      if (state.snake[0].x === 0) {
        return { ...state, gameover: true };
      }
      //tikrina ar suvalge
      if (state.food.x === state.snake[0].x - 1 && state.food.y === state.snake[0].y) {
        const { foodX, foodY } = getFoodCoord(state.snake);
        return {
          food: { x: foodX, y: foodY },
          score: state.score + 1,
          snake: [{ x: state.snake[0].x - 1, y: state.snake[0].y }, ...state.snake],
          direction: 'go left',
        };
      }
      //tikrina ar suvalge
      else {
        const newArr = [{ x: state.snake[0].x - 1, y: state.snake[0].y }, ...state.snake];
        newArr.pop();
        return {
          ...state,
          snake: newArr,
          direction: 'go left',
        };
      }
    case 'go down':
      // tikrina ar nepriejo sienos krasto
      if (state.snake[0].y === 9) {
        return { ...state, gameover: true };
      }
      //tikrina ar suvalge
      if (state.food.x === state.snake[0].x && state.food.y === state.snake[0].y + 1) {
        const { foodX, foodY } = getFoodCoord(state.snake);
        return {
          food: { x: foodX, y: foodY },
          score: state.score + 1,
          snake: [{ x: state.snake[0].x, y: state.snake[0].y + 1 }, ...state.snake],
          direction: 'go down',
        };
      }
      // jei nesuvalge
      else {
        const newArr = [{ x: state.snake[0].x, y: state.snake[0].y + 1 }, ...state.snake];
        newArr.pop();
        return {
          ...state,
          snake: newArr,
          direction: 'go down',
        };
      }

    case 'go right':
      // tikrina ar nepriejo sienos krasto
      if (state.snake[0].x === 9) {
        return { ...state, gameover: true };
      }
      //tikrina ar suvalge
      if (state.food.x === state.snake[0].x + 1 && state.food.y === state.snake[0].y) {
        const { foodX, foodY } = getFoodCoord(state.snake);
        return {
          food: { x: foodX, y: foodY },
          score: state.score + 1,
          snake: [{ x: state.snake[0].x + 1, y: state.snake[0].y }, ...state.snake],
          direction: 'go right',
        };
      }
      // jei nesuvalge
      else {
        const newArr = [{ x: state.snake[0].x + 1, y: state.snake[0].y }, ...state.snake];
        newArr.pop();
        return {
          ...state,
          snake: newArr,
          direction: 'go right',
        };
      }

    default:
      return state;
  }
}

export { initialState, SnakeReducer };
