import getFoodCoord from './getFoodCoord';

const initialState = {
  snake: [{ x: null, y: null }],
  food: { x: null, y: null },
  score: 0,
  direction: null,
  gameover: false,
  keyDown: false,
  speed: 500,
};

function SnakeReducer(state, action) {
  // variables
  const ifIgoUp = (some) => Boolean(some.x === state.snake[0].x && some.y === state.snake[0].y - 1);
  const ifIgoLeft = (some) =>
    Boolean(some.x === state.snake[0].x - 1 && some.y === state.snake[0].y);
  const ifIgoDown = (some) =>
    Boolean(some.x === state.snake[0].x && some.y === state.snake[0].y + 1);
  const ifIgoRight = (some) =>
    Boolean(some.x === state.snake[0].x + 1 && some.y === state.snake[0].y);

  switch (action) {
    // &&& Restart game &&&
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

    // &&& Handle keybord events &&&
    case 'keyup':
      return {
        ...state,
        keyDown: false,
      };
    case 'keydown up':
      return {
        ...state,
        keyDown: 'up',
      };
    case 'keydown left':
      return {
        ...state,
        keyDown: 'left',
      };
    case 'keydown down':
      return {
        ...state,
        keyDown: 'down',
      };
    case 'keydown right':
      return {
        ...state,
        keyDown: 'right',
      };

    // %%% HANDE SNAKE MOVEMENT %%%
    case 'go up':
      // checks if git the wall
      if (state.snake[0].y === 0) {
        return { ...state, gameover: true };
      }

      // prevents on moving to body direction
      if (state.snake.length > 1 && state.direction === 'go down') {
        return { ...state };
      }

      // checks if haven't bitten tail
      if (state.snake.some((coord) => ifIgoUp(coord))) {
        return { ...state, gameover: true };
      }

      // checks if eaten food
      if (ifIgoUp(state.food)) {
        const { foodX, foodY } = getFoodCoord(state.snake);
        return {
          ...state,
          food: { x: foodX, y: foodY },
          score: state.score + 1,
          snake: [{ x: state.snake[0].x, y: state.snake[0].y - 1 }, ...state.snake],
          direction: 'go up',
          speed: state.speed - 10,
        };
      }
      // if not eaten food
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
      // checks if hit the wall
      if (state.snake[0].x === 0) {
        return { ...state, gameover: true };
      }

      // prevents on moving to body direction
      if (state.snake.length > 1 && state.direction === 'go right') {
        return { ...state };
      }

      // checks if haven't bitten tail
      if (state.snake.some((coord) => ifIgoLeft(coord))) {
        return { ...state, gameover: true };
      }
      // checks if eaten food
      if (ifIgoLeft(state.food)) {
        const { foodX, foodY } = getFoodCoord(state.snake);
        return {
          ...state,
          food: { x: foodX, y: foodY },
          score: state.score + 1,
          snake: [{ x: state.snake[0].x - 1, y: state.snake[0].y }, ...state.snake],
          direction: 'go left',
          speed: state.speed - 10,
        };
      }
      // checks if eaten food
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
      // checks if hit the wall
      if (state.snake[0].y === 9) {
        return { ...state, gameover: true };
      }

      // prevents on moving to body direction
      if (state.snake.length > 1 && state.direction === 'go up') {
        return { ...state };
      }

      // checks if haven't bitten tail
      if (state.snake.some((coord) => ifIgoDown(coord))) {
        return { ...state, gameover: true };
      }
      // checks if eaten food
      if (ifIgoDown(state.food)) {
        const { foodX, foodY } = getFoodCoord(state.snake);
        return {
          ...state,
          food: { x: foodX, y: foodY },
          score: state.score + 1,
          snake: [{ x: state.snake[0].x, y: state.snake[0].y + 1 }, ...state.snake],
          direction: 'go down',
          speed: state.speed - 10,
        };
      }
      // if not eaten food
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
      // checks if hit the wall
      if (state.snake[0].x === 9) {
        return { ...state, gameover: true };
      }
      // prevents on moving to body direction
      if (state.snake.length > 1 && state.direction === 'go left') {
        console.log('suka i kuna');
        return { ...state };
      }

      // checks if haven't bitten tail
      if (state.snake.some((coord) => ifIgoRight(coord))) {
        return { ...state, gameover: true };
      }
      // checks if eaten food
      if (ifIgoRight(state.food)) {
        const { foodX, foodY } = getFoodCoord(state.snake);
        return {
          ...state,
          food: { x: foodX, y: foodY },
          score: state.score + 1,
          snake: [{ x: state.snake[0].x + 1, y: state.snake[0].y }, ...state.snake],
          direction: 'go right',
          speed: state.speed - 10,
        };
      }
      // if not eaten food
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
