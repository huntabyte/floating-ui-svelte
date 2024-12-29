import { isHTMLElement } from '@floating-ui/utils/dom';

export const TYPEABLE_SELECTOR =
	"input:not([type='hidden']):not([disabled])," +
	"[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";

export function isTypeableElement(element: unknown): boolean {
	return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
}

export function isTypeableCombobox(element: Element | null | undefined) {
	if (!element) return false;
	return element.getAttribute('role') === 'combobox' && isTypeableElement(element);
}
