import { activeElement, contains, getDocument } from './dom.js';
import { tabbable } from 'tabbable';

export function getTabbableOptions() {
	return {
		getShadowRoot: true,
		displayCheck: typeof ResizeObserver === 'function' ? 'full' : 'none',
	} as const;
}

export function getTabbableIn(container: HTMLElement, direction: 'next' | 'prev') {
	const allTabbable = tabbable(container, getTabbableOptions());

	if (direction === 'prev') {
		allTabbable.reverse();
	}

	const activeIndex = allTabbable.indexOf(activeElement(getDocument(container)) as HTMLElement);
	const nextTabbableElements = allTabbable.slice(activeIndex + 1);
	return nextTabbableElements[0];
}

export function getNextTabbable() {
	return getTabbableIn(document.body, 'next');
}

export function getPreviousTabbable() {
	return getTabbableIn(document.body, 'prev');
}

export function isOutsideEvent(event: FocusEvent, container?: Element) {
	const containerElement = container || (event.currentTarget as Element);
	const relatedTarget = event.relatedTarget as HTMLElement | null;
	return !relatedTarget || !contains(containerElement, relatedTarget);
}

export function disableFocusInside(container: HTMLElement) {
	const tabbableElements = tabbable(container, getTabbableOptions());
	for (const element of tabbableElements) {
		element.dataset.tabindex = element.getAttribute('tabindex') || '';
		element.setAttribute('tabindex', '-1');
	}
}

export function enableFocusInside(container: HTMLElement) {
	const elements = container.querySelectorAll<HTMLElement>('[data-tabindex]');
	for (const element of elements) {
		const tabindex = element.dataset.tabindex;
		delete element.dataset.tabindex;
		if (tabindex) {
			element.setAttribute('tabindex', tabindex);
		} else {
			element.removeAttribute('tabindex');
		}
	}
}
