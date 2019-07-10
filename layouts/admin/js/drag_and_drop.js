// Перемещение элементов в блоке "сетка сеансов"

const main = document.querySelector('.conf-steps');
const wrapMovies = main.querySelector('.conf-step__movie').closest('.conf-step__wrapper');
const formAddSeance = document.querySelector('.add-seance');
const formDeleteSeance = document.querySelector('.delete-seance');

let moviedMovie = null;
let minY, minX, maxX, maxY;
let shiftX = 0;
let shiftY = 0;

const check = ((x, y) => document.elementFromPoint(x, y).closest('.conf-step__seances-timeline'));

// временная мера, потом удалить
Array.from(wrapMovies.querySelectorAll('.conf-step__movie-poster')).forEach(el => el.setAttribute('draggable', false));

wrapMovies.onselectstart = (() => false); // запрет выделения в блоке "сетка сеансов"

const dragStart = event => {
  if(event.target.closest('.conf-step__movie')){
    movie = event.target.closest('.conf-step__movie');
    moviedMovie = movie.cloneNode(true);
    addMoviedMovie(movie, moviedMovie);
    shiftX = window.pageXOffset + moviedMovie.closest('.conf-step').getBoundingClientRect().left + + moviedMovie.offsetWidth/2;;
    shiftY = window.pageYOffset + moviedMovie.closest('.conf-step').getBoundingClientRect().top + moviedMovie.offsetHeight/2;
    minY = wrapMovies.offsetTop;
    minX = wrapMovies.offsetLeft;
    maxX = wrapMovies.offsetLeft + wrapMovies.offsetWidth - moviedMovie.offsetWidth;
    maxY = wrapMovies.offsetTop + wrapMovies.offsetHeight - moviedMovie.offsetHeight;

  } else if(event.target.closest('.conf-step__seances-movie')) {
    movie = event.target.closest('.conf-step__seances-movie');
    moviedMovie = movie.cloneNode(true);
    addMoviedMovie(movie, moviedMovie);
    movie.style.display = 'none';
    shiftX = window.pageXOffset + moviedMovie.closest('.conf-step__seances-timeline').getBoundingClientRect().left + moviedMovie.offsetWidth/2;;
    shiftY = window.pageYOffset + moviedMovie.closest('.conf-step__seances-timeline').getBoundingClientRect().top + moviedMovie.offsetHeight/2;
    minY = wrapMovies.offsetTop - moviedMovie.parentNode.offsetTop;
    minX = wrapMovies.offsetLeft - moviedMovie.parentNode.offsetLeft;
    maxX = wrapMovies.offsetLeft + wrapMovies.offsetWidth - moviedMovie.offsetWidth - moviedMovie.parentNode.offsetLeft;
    maxY = wrapMovies.offsetTop + wrapMovies.offsetHeight - moviedMovie.offsetHeight - moviedMovie.parentNode.offsetTop;
  }
};

const drag = throttle((event) => {
  if (moviedMovie) {
    // console.log(document.elementFromPoint(event.clientX, event.clientY));
    let timeLine = null;
    if(check(event.clientX, event.clientY) && moviedMovie.classList.contains('conf-step__movie')) {
      timeLine = check(event.clientX, event.clientY);
      timeLine.classList.add('time-line__focus');
    } else if (timeLine) {
      timeLine.classList.remove('time-line__focus');
      timeLine = null;
    }
    x = event.pageX - shiftX;
    y = event.pageY - shiftY;
    x = Math.min(x, maxX);
    y = Math.min(y, maxY);
    x = Math.max(x, minX);
    y = Math.max(y, minY);
    moviedMovie.style.left = x + 'px';
    moviedMovie.style.top = y + 'px';
  }
});

const drop = event => {
  if (moviedMovie) {
    const nameMovie = moviedMovie.querySelector('.conf-step__seances-movie-title') ? moviedMovie.querySelector('.conf-step__seances-movie-title').textContent : '';
    moviedMovie.remove();
    const focusElement = check(event.clientX, event.clientY);
    if(focusElement && moviedMovie.classList.contains('conf-step__movie')) {
      focusElement.classList.remove('time-line__focus');
      formAddSeance.style.display = 'block';
      const hallId = focusElement.closest('.conf-step__seances-hall').dataset.hallId;
      checkedHall(hallId);
    } else if (!focusElement && moviedMovie.classList.contains('conf-step__seances-movie')) {
      formDeleteSeance.style.display = 'block';
      formDeleteSeance.querySelector('.popup__title').textContent = 'Снять с сеанса "' + nameMovie + '"?';
    } else {
      movie.style.display = 'block';
    }
    moviedMovie = null;
  }
};

document.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', drop);

document.addEventListener('touchstart', event => dragStart(event.touches[0]));
document.addEventListener('touchmove', event => drag(event.touches[0]));
document.addEventListener('touchend', event => drop(event.changedTouches[0]));

function throttle(callback) {
  let isWaiting = false;
  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    }
  };
}

function addMoviedMovie(movie, newMovie) {
  movie.parentNode.appendChild(newMovie);
  newMovie.style.position = 'absolute';
  newMovie.style.left = `${movie.offsetLeft}px`;
  newMovie.style.top = `${movie.offsetTop}px`;
  newMovie.style.width = `${movie.getBoundingClientRect().width}px`;
  newMovie.style.backgroundColor = window.getComputedStyle(movie).backgroundColor;
}

function checkedHall(id) {
  Array.from(document.querySelectorAll('.popup [name=prices-hall]')).forEach(el => {
    el.removeAttribute('checked');
    if(el.dataset.hallId === id) {
      el.setAttribute('checked', 'checked');
    }
  });
}
