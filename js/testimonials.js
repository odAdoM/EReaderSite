(function () {
	'use strict';

	//--------------| testimonials |----------------

	var slider = document.querySelector('.slider');
	var slides = document.querySelectorAll('.slide');
	var leftArrow = document.querySelector('.testimonials-grid__controls i:nth-child(1)');
	var rightArrow = document.querySelector('.testimonials-grid__controls i:nth-child(2)');
	var dotsWrapper = document.querySelector('.dots');
	var dots = document.querySelectorAll('.dots span');
	var wrapper = document.querySelector('.testimonials-grid__wrapper');
	var SLIDES_AMOUNT = slides.length;
	var slideIndex = 0;
	leftArrow.addEventListener('click', function (e) {
	  goLeft();
	});
	rightArrow.addEventListener('click', function (e) {
	  goRight();
	});
	function goLeft() {
	  clearInterval(to);
	  slideIndex > 0 ? slideIndex-- : slideIndex = SLIDES_AMOUNT - 1;
	  setIndex();
	}
	function goRight() {
	  clearInterval(to);
	  // slideIndex < SLIDES_AMOUNT - 1 ? slideIndex++ : (slideIndex = 0);
	  slideIndex = (slideIndex + 1) % SLIDES_AMOUNT;
	  setIndex();
	}
	function setIndex() {
	  var w = wrapper.getBoundingClientRect().width;
	  slider.style.transform = "translateX(".concat(slideIndex * -w, "px)");
	  clearAllDotsFromActive();
	  dotsWrapper.children[slideIndex].classList.add('active');
	  setTimer();
	}
	dots.forEach(function (dot, index) {
	  dot.addEventListener('click', function () {
	    clearInterval(to);
	    slideIndex = index;
	    setIndex();
	  });
	});
	function clearAllDotsFromActive() {
	  dots.forEach(function (dot) {
	    dot.classList.remove('active');
	  });
	}

	// -----------------------------

	var INTERVAL_TIME = 5000;
	var to;
	function setTimer() {
	  to = setTimeout(function () {
	    goRight();
	  }, INTERVAL_TIME);
	}
	//==>
	setTimer();

	//to keep actual slide in the center od slider
	window.addEventListener('resize', function () {
	  clearInterval(to);
	  slider.classList.add('no-transition');
	  setIndex();
	  slider.classList.remove('no-transition');
	});

	// -----------------------------

	// swipe vars
	var startX = 0;
	var endX = 0;
	slider.addEventListener('touchstart', function (e) {
	  startX = e.touches[0].clientX;
	});
	slider.addEventListener('touchend', function (e) {
	  endX = e.changedTouches[0].clientX;
	  handleSwipe();
	});
	function handleSwipe() {
	  console.log('touch!');
	  var deltaX = endX - startX;
	  if (Math.abs(deltaX) > 40) {
	    // if (deltaX > 0) {
	    // 	currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
	    // } else {
	    // 	currentIndex = (currentIndex + 1) % slides.length;
	    // }
	    if (deltaX > 0) goLeft();else goRight();
	  }
	}

})();
//# sourceMappingURL=testimonials.js.map
