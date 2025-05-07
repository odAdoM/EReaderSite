//--------------| navigation |----------------

const menuIcon = document.querySelector('.menu-icon');
const cnt = document.querySelector('.container');
const loader = document.querySelector('.loader-wrapper');

const navItems = document.querySelectorAll('.nav-items > a');
const path = window.location.pathname.split('/').pop();
const CONTACT_HREF = '#contact';

function navItemClickHandler(e) {
	if (e.target.getAttribute('href') === CONTACT_HREF) {
		cnt.classList.remove('navigate');
		unblockedBody();
	}
}

function deselectMenu() {
	navItems.forEach((item) => {
		item.classList.remove('active');
	});
}

function selectMenu() {
	navItems.forEach((link) => {
		const href = link.getAttribute('href');
		if (href === path || (href === 'index.html' && path === '')) {
			link.classList.add('active');
		}
	});
}

// ==>
navItems.forEach((item) => {
	item.addEventListener('click', navItemClickHandler);
});

menuIcon.addEventListener('click', (e) => {
	cnt.classList.toggle('navigate');
	if (cnt.classList.contains('navigate')) {
		blockedBody();
	} else {
		unblockedBody();
	}
});

selectMenu();

//--------------| after menu opening -> blockage |----------------

const ROOT = document.querySelector(':root');
const BODY = document.body;
let mobileScrollBlockageTO;
let scrollPosition = 0;
let scrollBarWidth = 0;

function blockedBody() {
	//scrollPosition = window.scrollY; //if body == absolute
	scrollY = parseInt(BODY.style.top || '0', 10) * -1;
	scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

	ROOT.style.scrollBehavior = 'auto';
	BODY.style.overflow = 'hidden';
	BODY.style.position = 'fixed';
	BODY.style.top = `-${scrollPosition}px`;
	BODY.style.width = '100%';
	BODY.style.paddingRight = `${scrollBarWidth}px`;
}

function unblockedBody(backToPreviousScrollPosition = true) {
	clearTimeout(mobileScrollBlockageTO);
	BODY.style.overflow = 'visible';
	BODY.style.position = 'static';
	BODY.style.top = '0px';
	BODY.style.paddingRight = '0px';
	if (backToPreviousScrollPosition) window.scrollTo(0, scrollPosition);
	ROOT.style.scrollBehavior = 'smooth';
}

//--------------| loader |----------------

window.addEventListener('load', () => {
	if (cnt.classList.contains('index-container')) {
		blockedBody();

		setTimeout(() => {
			loader.classList.add('hide');
		}, 3000);
		setTimeout(() => {
			cnt.classList.add('show');
			unblockedBody();
		}, 2500);
	}
});
