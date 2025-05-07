//--------------| testimonials |----------------

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.testimonials-grid__controls i:nth-child(1)');
const rightArrow = document.querySelector('.testimonials-grid__controls i:nth-child(2)');
const dotsWrapper = document.querySelector('.dots');
const dots = document.querySelectorAll('.dots span');
const wrapper = document.querySelector('.testimonials-grid__wrapper');

const OFFSET = 20;
const SLIDES_AMOUNT = slides.length;
let slideIndex = 0;

leftArrow.addEventListener('click', (e) => {
	goLeft();
});

rightArrow.addEventListener('click', (e) => {
	goRight();
});

function goLeft() {
	clearInterval(to);
	slideIndex > 0 ? slideIndex-- : (slideIndex = SLIDES_AMOUNT - 1);
	setIndex();
}

function goRight() {
	clearInterval(to);
	// slideIndex < SLIDES_AMOUNT - 1 ? slideIndex++ : (slideIndex = 0);
	slideIndex = (slideIndex + 1) % SLIDES_AMOUNT;
	setIndex();
}

function setIndex() {
	let w = wrapper.getBoundingClientRect().width;
	slider.style.transform = `translateX(${slideIndex * -w}px)`;
	clearAllDotsFromActive();
	dotsWrapper.children[slideIndex].classList.add('active');

	//setTimer();
}

dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		clearInterval(to);

		slideIndex = index;
		setIndex();
	});
});

function clearAllDotsFromActive() {
	dots.forEach((dot) => {
		dot.classList.remove('active');
	});
}

// -----------------------------

const INTERVAL_TIME = 5000;
let to;

function setTimer() {
	to = setTimeout(() => {
		goRight();
	}, INTERVAL_TIME);
}
//==>
//setTimer();

//to keep actual slide in the center od slider
window.addEventListener('resize', () => {
	clearInterval(to);
	slider.classList.add('no-transition');
	setIndex();
	slider.classList.remove('no-transition');
});

// -----------------------------

// Obsługa swipe
let startX = 0;
let endX = 0;

slider.addEventListener('touchstart', (e) => {
	startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
	endX = e.changedTouches[0].clientX;
	handleSwipe();
});

function handleSwipe() {
	console.log('touch!');
	const deltaX = endX - startX;
	if (Math.abs(deltaX) > 40) {
		// if (deltaX > 0) {
		// 	currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
		// } else {
		// 	currentIndex = (currentIndex + 1) % slides.length;
		// }
		if (deltaX > 0) goLeft();
		else goRight();
	}
}
