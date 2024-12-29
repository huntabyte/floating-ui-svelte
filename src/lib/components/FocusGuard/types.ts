import type { HTMLAttributes } from 'svelte/elements';

export interface FocusGuardProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
	/** The bound HTML element reference */
	ref: Element | null;
}
