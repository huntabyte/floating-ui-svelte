<script lang="ts" module>
	import { getNodeName } from '@floating-ui/utils/dom';
	import { getTabbableOptions } from '../../utils/tabbable.js';
	import { isTabbable, tabbable } from 'tabbable';
	import type { FloatingFocusManagerProps } from './types.js';
	import { isTypeableCombobox } from '$lib/utils/is-typable-element.js';

	const LIST_LIMIT = 20;
	let previouslyFocusedElements: Element[] = [];

	function addPreviousFocusedElement(element: Element | null) {
		previouslyFocusedElements = previouslyFocusedElements.filter((el) => el.isConnected);

		if (element && getNodeName(element) !== 'body') {
			previouslyFocusedElements.push(element);
			if (previouslyFocusedElements.length > LIST_LIMIT) {
				previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
			}
		}
	}

	function getPreviouslyFocusedELement() {
		return previouslyFocusedElements
			.slice()
			.reverse()
			.find((el) => el.isConnected);
	}

	function getFirstTabbableElement(container: Element) {
		const tabbableOptions = getTabbableOptions();
		if (isTabbable(container, tabbableOptions)) {
			return container;
		}

		return tabbable(container, tabbableOptions)[0] || container;
	}
</script>

<script lang="ts">
	let {
		context,
		children,
		disabled = false,
		order = ['content'],
		guards: _guards = true,
		initialFocus = 0,
		returnFocus = true,
		restoreFocus = false,
		modal = true,
		visuallyHiddenDismiss = false,
		closeOnFocusOut = true,
		outsideElementsInert = false,
	}: FloatingFocusManagerProps = $props();

	const ignoreInitialFocus = $derived(typeof initialFocus === 'number' && initialFocus < 0);

	// If the reference is a combobox and is typeable (e.g. input/textarea),
	// there are different focus semantics. The guards should not be rendered, but
	// aria-hidden should be applied to all nodes still. Further, the visually
	// hidden dismiss button should only appear at the end of the list, not the
	// start.
	const isUntrappedTypeableCombobox =
		isTypeableCombobox(context.elements.reference) && ignoreInitialFocus;
</script>
