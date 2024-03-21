import { readable } from 'svelte/store';
import { browser } from '$app/environment';


/** Prefers reduced motion  */
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function prefersReducedMotion() {
	if (!browser) return false;
	return window.matchMedia(reducedMotionQuery).matches;
}

/**
 * Indicates that the user has enabled reduced motion on their device.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 */
export const prefersReducedMotionStore = readable(prefersReducedMotion(), (set) => {
	if (browser) {
		const setReducedMotion = (event: MediaQueryListEvent) => {
			set(event.matches);
		};
		const mediaQueryList = window.matchMedia(reducedMotionQuery);
		mediaQueryList.addEventListener('change', setReducedMotion);

		return () => {
			mediaQueryList.removeEventListener('change', setReducedMotion);
		};
	}
});
