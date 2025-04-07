//--------------| navigation |----------------

const menuIcon = document.querySelector('.menu-icon');
const cnt = document.querySelector('.container');

menuIcon.addEventListener('click', (e) => {
	cnt.classList.toggle('navigate');
});

//FIXME: click on contact -> menu hides
