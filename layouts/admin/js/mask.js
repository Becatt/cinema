// валидация поля времени начала сеансаs

const input = document.querySelector('#time-start');
input.addEventListener('input', mask);
function mask() {
  const value = event.currentTarget.value;
  const numbers = value.match(/\d/g) ? value.match(/\d/g) : '';
  let hour = '';
  let minute = '';

  if(numbers[0]) {
    numbers[0] = numbers[0] > 2 ? '2' : numbers[0];
    hour = numbers[0];
  } else {
    event.currentTarget.value = '';
  }
  if(numbers[1]) {
    hour = hour + numbers[1] > 23 ? '23' : hour + numbers[1];
  }
  if(numbers[2]) {
    numbers[2] = numbers[2] > 5 ? '5' : numbers[2];
    minute = numbers[2];
  }
  if(numbers[3]) {
    minute = minute + numbers[3] > 59 ? '59' : minute + numbers[3];
  }
  if(hour) {
    event.currentTarget.value = hour;
  }
  if(minute) {
    event.currentTarget.value = hour + ':' + minute;
  }
}
