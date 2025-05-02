//--------------| testimonials |----------------

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.testimonials-section__controls i:nth-child(1)');
const rightArrow = document.querySelector('.testimonials-section__controls i:nth-child(2)');
const dotsWrapper = document.querySelector('.dots');
const dots = document.querySelectorAll('.dots span');
console.log(dots);

const OFFSET = 20;
const SLIDES_AMOUNT = slides.length;
let slideIndex = 0;

leftArrow.addEventListener('click', (e) => {
	clearInterval(to);
	goLeft();
});

rightArrow.addEventListener('click', (e) => {
	clearInterval(to);
	goRight();
});

function goLeft() {
	slideIndex > 0 ? slideIndex-- : (slideIndex = SLIDES_AMOUNT - 1);
	setIndex();
}

function goRight() {
	slideIndex < SLIDES_AMOUNT - 1 ? slideIndex++ : (slideIndex = 0);
	setIndex();
}

function setIndex() {
	slider.style.transform = `translateX(${slideIndex * -OFFSET}%)`;
	clearAllDotsFromActive();
	dotsWrapper.children[slideIndex].classList.add('active');

	setTimer();
}

dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		slideIndex = index;

		clearAllDotsFromActive();
		dot.classList.add('active');
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

setTimer();
