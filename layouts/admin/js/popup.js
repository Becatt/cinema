// вызов и поведение модальных окон

// вызов
const popupBtns = Array.from(document.querySelectorAll('.popup-btn'));
popupBtns.forEach((el) =>
  el.addEventListener('click', () => {
    const action = event.target.dataset.action;
    const popup = document.querySelector(`.${action}`);
    const overlay = document.querySelector('.overlay');
    popup.style.display = 'block';
    overlay.style.display = 'block';

    if(action === 'delete_hall') {
      const hallName = el.parentNode.textContent.split(/\s*$/m)[0]; //Убираю перенос строки в концеы
      popup.querySelector('.popup__title').textContent = `Удалить ${hallName}?`;
      el.parentNode.dataset.delete = true;
    }
}));



const popaps = Array.from(document.querySelectorAll('.popup'));
popaps.forEach((el) => {
  el.addEventListener('click', (event) => {
	if(event.target.classList.contains('conf-step__button')) {
      event.preventDefault();
	  el.style.display = 'none';
	  overlay.style.display = 'none';
	  deleteElement();
	  if(event.target.closest('.delete-seance')) {
	  	// document.querySelector('.conf-step__seances-movie + [style]')
	  }
	}
  });
});

function deleteElement(element='') {
  // if() {

  // }
  const el = document.querySelector('[data-delete=true]');
  el.parentNode.removeChild(el);
}

