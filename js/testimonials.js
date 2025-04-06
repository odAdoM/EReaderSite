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
	slideIndex > 0 ? slideIndex-- : (slideIndex = 0);
	setIndex();
});

rightArrow.addEventListener('click', (e) => {
	slideIndex < SLIDES_AMOUNT - 1 ? slideIndex++ : (slideIndex = SLIDES_AMOUNT - 1);
	setIndex();
});

function setIndex() {
	slider.style.transform = `translateX(${slideIndex * -OFFSET}%)`;
	clearAllDotsFromActive();
	dotsWrapper.children[slideIndex].classList.add('active');
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
