import { LOADER_TIME } from './vars.js';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.killAll();

document.addEventListener('DOMContentLoaded', () => {
	const blueLines = document.querySelectorAll('.section-border');
	const sectionNumSpans = document.querySelectorAll('.section-num > span');
	const image = document.querySelector('.banner > h1');
	const texts = document.querySelector('.banner > h3');

	const splitHeading = new SplitText(texts);

	const masterTL = gsap.timeline();

	masterTL
		.add(createHeaderTimeline(image, splitHeading), LOADER_TIME > 0 ? LOADER_TIME / 1000 : 0.5)
		.add(createBannerImageTimeline(image), '<+1');

	setupResponsiveScrollTriggers();

	window.addEventListener('resize', () => {
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		setupResponsiveScrollTriggers();
		ScrollTrigger.refresh();
	});

	//------------------------------------------------------------------------

	function createHeaderTimeline(imageEl, splitTextInstance) {
		const tlHeader = gsap.timeline();

		tlHeader
			.fromTo(imageEl, { opacity: 0 }, { opacity: 1, duration: 1.2 })
			.fromTo(
				splitTextInstance.chars,
				{
					opacity: 0,
					scale: 0.1,
					xPercent: (index) => (index + 1) * 20,
					yPercent: (index) => (index + 1) * 10,
					rotateZ: (index) => (index + 1) * 25,
				},
				{
					opacity: 1,
					xPercent: 0,
					yPercent: 0,
					rotateZ: 0,
					duration: 0.6,
					scale: 1,
					ease: 'power2.out',
				},
				'<+0.6'
			)
			.fromTo('.banner > h4', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1, ease: 'slow(0.5,0.5,false)' });

		return tlHeader;
	}

	function createBannerImageTimeline(imageEl) {
		const tl = gsap.timeline({ repeat: -1, yoyo: true });

		tl.to(imageEl, {
			backgroundPosition: () => {
				const xx = gsap.utils.random(30, 65);
				const yy = gsap.utils.random(40, 60);
				return `${xx}% ${yy}%`;
			},
			duration: 4,
			ease: 'power1.inOut',
		});

		return tl;
	}

	function setupResponsiveScrollTriggers() {
		const mm = gsap.matchMedia();
		const changeDim = 640;

		mm.add(`(min-width: ${changeDim - 1}px)`, () => {
			sectionNumSpans.forEach((el) => createZoomScrollTrigger(el, '20% 45%', '20% 25%'));
			blueLines.forEach((line) => {
				createBlueLineTrigger(line, line.dataset.animateLine, 'top 75%', 'top 50%');
			});
		});

		mm.add(`(max-width: ${changeDim}px)`, () => {
			sectionNumSpans.forEach((el) => createZoomScrollTrigger(el, '50% 55%', '50% 30%'));
			blueLines.forEach((line) => {
				createBlueLineTrigger(line, line.dataset.animateLine, 'top 90%', 'top 70%');
			});
		});
	}

	function createZoomScrollTrigger(el, start, end) {
		//console.log('zoom');
		return gsap.fromTo(
			el,
			{ backgroundSize: '110%' },
			{
				backgroundSize: '180%',
				duration: 0.8,
				ease: 'power2.inOut',
				scrollTrigger: {
					trigger: el,
					start,
					end,
					toggleActions: 'restart none none reverse',
					//invalidateOnRefresh: true,
					//markers: true,
				},
			}
		);
	}

	function createBlueLineTrigger(line, direction = 'left', start, end) {
		if (!line) return;
		const marker = line.querySelector('.blue-marker');
		if (!marker) return;

		const lineWidth = line.offsetWidth;
		const markerWidth = marker.offsetWidth;
		const xScaleBefore = 3;
		const yScaleBefore = 0.5;
		let xValueBefore = 0;
		let xValueAfter = 0;

		switch (direction) {
			case 'left':
				xValueBefore = lineWidth - markerWidth / 2 + (markerWidth * xScaleBefore) / 2;
				xValueAfter = 0;
				break;
			case 'right':
				xValueBefore = -(markerWidth * xScaleBefore) / 2 - markerWidth / 2;
				xValueAfter = lineWidth - markerWidth;
				break;
			case 'center':
				xValueBefore = xValueAfter = (lineWidth - markerWidth) / 2;
				break;
		}

		return gsap.fromTo(
			marker,
			{
				opacity: 0,
				x: xValueBefore,
				scaleX: xScaleBefore,
				scaleY: yScaleBefore,
				transformOrigin: 'center top',
			},
			{
				x: xValueAfter,
				opacity: 1,
				scaleX: 1,
				scaleY: 1,
				scrollTrigger: {
					trigger: marker,
					start,
					end,
					scrub: true,
					// invalidateOnRefresh: true,
					// markers: {
					// 	startColor: 'orange',
					// 	endColor: 'yellowgreen',
					// 	fontSize: '12px',
					// 	fontWeight: 'bold',
					// 	indent: 20,
					// },
				},
			}
		);
	}
});
