// funkcija, kuri sugeneruoja koordinated, kurios nebus lygios paduotom i parametrus
function getFoodCoord(coordsArr) {
  let foodX = Math.floor(Math.random() * 10);
  let foodY = Math.floor(Math.random() * 10);
  coordsArr.forEach((coors) => {
    while (coors.x === foodX && coors.y === foodY) {
      foodX = Math.floor(Math.random() * 10);
      foodY = Math.floor(Math.random() * 10);
    }
  });

  return { foodX, foodY };
}

export default getFoodCoord;
