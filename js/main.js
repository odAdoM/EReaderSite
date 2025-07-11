(function () {
	'use strict';

	var LOADER_TIME = 3000;

	//--------------| navigation |----------------

	var menuIcon = document.querySelector('.menu-icon');
	var cnt = document.querySelector('.container');
	var loader = document.querySelector('.loader-wrapper');
	var navItems = document.querySelectorAll('.nav-items > a');
	var path = window.location.pathname.split('/').pop();
	var CONTACT_HREF = '#contact';
	function navItemClickHandler(e) {
	  if (e.target.getAttribute('href') === CONTACT_HREF) {
	    cnt.classList.remove('navigate');
	    unblockedBody();
	  }
	}
	function selectMenu() {
	  navItems.forEach(function (link) {
	    var href = link.getAttribute('href');
	    if (href === path || href === 'index.html' && path === '') {
	      link.classList.add('active');
	    }
	  });
	}

	// ==>
	navItems.forEach(function (item) {
	  item.addEventListener('click', navItemClickHandler);
	});
	menuIcon.addEventListener('click', function (e) {
	  cnt.classList.toggle('navigate');
	  if (cnt.classList.contains('navigate')) {
	    blockedBody();
	  } else {
	    unblockedBody();
	  }
	});
	selectMenu();

	//--------------| after menu opening -> blockage |----------------

	var ROOT = document.querySelector(':root');
	var BODY = document.body;
	var mobileScrollBlockageTO;
	var scrollPosition = 0;
	var scrollBarWidth = 0;
	function blockedBody() {
	  //scrollPosition = window.scrollY; //if body == absolute
	  scrollY = parseInt(BODY.style.top || '0', 10) * -1;
	  scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
	  ROOT.style.scrollBehavior = 'auto';
	  BODY.style.overflow = 'hidden';
	  BODY.style.position = 'fixed';
	  BODY.style.top = "-".concat(scrollPosition, "px");
	  BODY.style.width = '100%';
	  BODY.style.paddingRight = "".concat(scrollBarWidth, "px");
	}
	function unblockedBody() {
	  var backToPreviousScrollPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	  clearTimeout(mobileScrollBlockageTO);
	  BODY.style.overflow = 'visible';
	  BODY.style.position = 'static';
	  BODY.style.top = '0px';
	  BODY.style.paddingRight = '0px';
	  if (backToPreviousScrollPosition) window.scrollTo(0, scrollPosition);
	  ROOT.style.scrollBehavior = 'smooth';
	}

	//--------------| loader |----------------

	window.addEventListener('load', function () {
	  if (cnt.classList.contains('index-container')) {
	    blockedBody();
	    setTimeout(function () {
	      loader.classList.add('hide');
	    }, LOADER_TIME);
	    setTimeout(function () {
	      cnt.classList.add('show');
	      unblockedBody();
	    }, LOADER_TIME - 500);
	  }
	});

})();
//# sourceMappingURL=main.js.map
