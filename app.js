document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');

  const width = 8;
  let currentIndex = 0; // first div in our grid //
  let appleIndex = 0; //first div in grid //
  let currentSnake = [2, 1, 0]; // 2 is the head,0 the tail, 1's for the body //
  let direction = 1;
  let score = 0;
  let speed = 2.0;
  let intervalTime = 0;
  let interval = 0;

  // To start the game //
  function startGame() {
    currentSnake.forEach((index) => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  //function that deals with all possible snake moveses  //

  function moveOutcomes() {
    //deals with snake hitting borders //
    if (
      (currentSnake[0] + width >= width * width && direction === width) || //snake hits bottom//
      (currentSnake[0] % width === width - 1 && direction === 1) || // snake hits right wall //
      (currentSnake[0] % width === 0 && direction === -1) || // snake hits left wall //
      (currentSnake[0] - width < 0 && direction === -width) || // snake hits the top //
      squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself //
    ) {
      return clearInterval(interval); // this will clear the intervall..if above happens //
    }

    const tail = currentSnake.pop(); //
    squares[tail].classList.remove('snake'); //removes class of snake from the tail //
    currentSnake.unshift(currentSnake[0] + direction); // gives direction to head of snake //

    //deals with snake getting apple //
    if (squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake');
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake');
  }

  //generate new apple after one is eaten ..//
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
  }

  // assign functions to keys //

  function control(e) {
    squares[currentIndex].classList.remove('snake'); // removing class of snake from ALL squares. //

    if (e.keyCode === 39) {
      direction = 1; //right arrow
    } else if (e.keyCode === 38) {
      direction = -width; // up arrow
    } else if (e.keyCode === 37) {
      direction = -1; // left arrow //
    } else if (e.keyCode == 40) {
      direction = +width; // down arrow
    }
  }

  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);
});
