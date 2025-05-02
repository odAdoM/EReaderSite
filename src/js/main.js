//--------------| navigation |----------------

const menuIcon = document.querySelector('.menu-icon');
const cnt = document.querySelector('.container');

const navItems = document.querySelectorAll('.nav-items > a');
const path = window.location.pathname.split('/').pop();
const CONTACT_HREF = '#contact';

function navItemClickHandler(e) {
	if (e.target.getAttribute('href') === CONTACT_HREF) {
		cnt.classList.remove('navigate');
		closedMenu();
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
		mobileScrollBlockageTO = setTimeout(openedMenu, 300);
	} else {
		closedMenu();
	}
});

selectMenu();

//--------------| after menu opening -> blockage |----------------

const ROOT = document.querySelector(':root');
const BODY = document.body;
let mobileScrollBlockageTO;
let scrollPosition = 0;

function openedMenu() {
	scrollPosition = window.scrollY;
	ROOT.style.scrollBehavior = 'auto';
	BODY.style.overflow = 'hidden';
	BODY.style.position = 'absolute';
	BODY.style.top = `-${scrollPosition}px`;
	BODY.style.width = '100%';
}

function closedMenu(backToPreviousScrollPosition = true) {
	clearTimeout(mobileScrollBlockageTO);
	BODY.style.overflow = 'visible';
	BODY.style.position = 'static';
	BODY.style.top = '0px';
	if (backToPreviousScrollPosition) window.scrollTo(0, scrollPosition);
	ROOT.style.scrollBehavior = 'smooth';
}
