import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.killAll();

document.addEventListener('DOMContentLoaded', () => {
	gsap.to('.box', {
		scrollTrigger: {
			trigger: '.banner',
			start: 'top center',
			end: 'bottom 20%',
			scrub: true,
			markers: true,
		},
		x: 400,
		y: -200,
		scale: 3,
	});
});
