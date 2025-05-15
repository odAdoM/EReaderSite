import { LOADER_TIME } from './vars.js';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.killAll();

document.addEventListener('DOMContentLoaded', () => {
	const sectionNumSpans = document.querySelectorAll('.section-num > span');
	const image = document.querySelector('.banner > h1');
	const texts = document.querySelector('.banner > h3');
	const splitHeading = new SplitText(texts);

	const tl = gsap.timeline();
	tl.add(bannerImage()).add(blueLine()).add(zoomImage()).add(header());

	function header() {
		const tlHeader = gsap.timeline();

		tlHeader
			.fromTo(image, { opacity: 0 }, { opacity: 1, duration: 1.2 }, LOADER_TIME > 0 ? LOADER_TIME / 1000 : 0.5)
			.fromTo(
				splitHeading.chars,
				{
					opacity: 0,
					xPercent: (index) => {
						return (index + 1) * 20;
					},
					yPercent: (index) => {
						return (index + 1) * 15;
					},
					rotateZ: (index) => {
						return (index + 1) * 35;
					},
				},
				{ opacity: 1, xPercent: 0, yPercent: 0, rotateZ: 0, duration: 0.6, ease: 'power2.out' },
				'<+0.6'
			)
			.fromTo('.banner > h4', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1, ease: 'slow(0.5,0.5,false)' });

		return tlHeader;
	}

	function bannerImage() {
		const xx = gsap.utils.random(30, 55);
		const yy = gsap.utils.random(40, 60);

		gsap.to(image, {
			backgroundPosition: `${xx}% ${yy}%`,
			duration: 4,
			ease: 'power2.inOut',
			onComplete: () => bannerImage(),
		});
	}

	function zoomImage() {
		Array.from(sectionNumSpans).forEach((el) => {
			gsap.fromTo(
				el,
				{ backgroundSize: '110%' },
				{
					backgroundSize: '180%',
					duration: 1,
					ease: 'power2.inOut',
					scrollTrigger: {
						trigger: el,
						start: '20% 45%',
						end: '20% 25%',
						toggleActions: 'restart none none reverse',
						//markers: true,
					},
				}
			);
		});
	}

	function blueLine() {
		document.querySelectorAll('.section-border').forEach((line) => {
			animateBlueLine(line, line.dataset.animateLine);
		});
	}

	function animateBlueLine(line, direction = 'left') {
		if (!line) return;
		const marker = line.querySelector('.blue-marker');
		if (!marker) return;

		const lineWidth = line.offsetWidth;
		const markerWidth = marker.offsetWidth;
		let xValueBefore = 0;
		let xValueAfter = 0;
		const xScaleBefore = 3;
		const yScaleBefore = 0.5;

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

		gsap.fromTo(
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
					start: 'top 75%',
					end: 'top 50%',
					scrub: true,
					/* markers: {
						startColor: 'orange',
						endColor: 'yellowgreen',
						fontSize: '12px',
						fontWeight: 'bold',
						indent: 20,
					}, */
				},
			}
		);
	}
});
