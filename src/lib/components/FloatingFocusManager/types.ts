import type { FloatingContext } from '$lib/hooks/useFloating/index.svelte.js';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export interface VisuallyHiddenDismissProps extends HTMLButtonAttributes {
	/** The bound reference to the element */
	ref: Element | null;
}

export interface FloatingFocusManagerProps {
	children: Snippet;
	/**
	 * The floating context returned from `useFloating`.
	 */
	context: FloatingContext;
	/**
	 * Whether or not the focus manager should be disabled. Useful to delay focus
	 * management until after a transition completes or some other conditional
	 * state.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * The order in which focus cycles.
	 * @default ['content']
	 */
	order?: Array<'reference' | 'floating' | 'content'>;
	/**
	 * Which element to initially focus. Can be either a number (tabbable index as
	 * specified by the `order`) or a ref.
	 * @default 0
	 */
	initialFocus?: number | HTMLElement | null;
	/**
	 * Determines if the focus guards are rendered. If not, focus can escape into
	 * the address bar/console/browser UI, like in native dialogs.
	 * @default true
	 */
	guards?: boolean;
	/**
	 * Determines if focus should be returned to the reference element once the
	 * floating element closes/unmounts (or if that is not available, the
	 * previously focused element). This prop is ignored if the floating element
	 * lost focus.
	 * It can be also set to a ref to explicitly control the element to return focus to.
	 * @default true
	 */
	returnFocus?: boolean | HTMLElement | null;
	/**
	 * Determines if focus should be restored to the nearest tabbable element if
	 * focus inside the floating element is lost (such as due to the removal of
	 * the currently focused element from the DOM).
	 * @default false
	 */
	restoreFocus?: boolean;
	/**
	 * Determines if focus is “modal”, meaning focus is fully trapped inside the
	 * floating element and outside content cannot be accessed. This includes
	 * screen reader virtual cursors.
	 * @default true
	 */
	modal?: boolean;
	/**
	 * If your focus management is modal and there is no explicit close button
	 * available, you can use this prop to render a visually-hidden dismiss
	 * button at the start and end of the floating element. This allows
	 * touch-based screen readers to escape the floating element due to lack of
	 * an `esc` key.
	 * @default undefined
	 */
	visuallyHiddenDismiss?: boolean | string;
	/**
	 * Determines whether `focusout` event listeners that control whether the
	 * floating element should be closed if the focus moves outside of it are
	 * attached to the reference and floating elements. This affects non-modal
	 * focus management.
	 * @default true
	 */
	closeOnFocusOut?: boolean;
	/**
	 * Determines whether outside elements are `inert` when `modal` is enabled.
	 * This enables pointer modality without a backdrop.
	 * @default false
	 */
	outsideElementsInert?: boolean;
}
