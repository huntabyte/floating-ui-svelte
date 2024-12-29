<script lang="ts" module>
	import { isSafari } from '$lib/utils/environment.js';
	import { styleObjectToString } from '$lib/utils/style-object-to-string.js';
	import type { PropertiesHyphen } from 'csstype';
	import { on } from 'svelte/events';
	import type { FocusGuardProps } from './types.js';
	import { createAttribute } from '$lib/utils/dom.js';

	export const HIDDEN_STYLES_OBJ: PropertiesHyphen = {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: '1px',
		margin: '-1px',
		overflow: 'hidden',
		padding: 0,
		position: 'fixed',
		'white-space': 'nowrap',
		width: '1px',
		top: 0,
		left: 0,
	};

	export const HIDDEN_STYLES_STR = styleObjectToString(HIDDEN_STYLES_OBJ);

	let activeElement: HTMLElement | undefined;
	let timeoutId: number | undefined;

	function setActiveElementOnTab(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			activeElement = event.target as typeof activeElement;
			clearTimeout(timeoutId);
		}
	}
</script>

<script lang="ts">
	let role = $state<'button' | undefined>();

	$effect(() => {
		if (isSafari()) {
			// Unlike other screen readers such as NVDA and JAWS, the virtual cursor
			// on VoiceOver does trigger the onfocus event, so we can use the focus
			// trap element. On Safari, only buttons trigger the onfocus event.
			role = 'button';
		}

		const removeKeydownListener = on(document, 'keydown', setActiveElementOnTab);

		return () => {
			removeKeydownListener();
		};
	});

	let { ref = $bindable(null), ...rest }: FocusGuardProps = $props();

	const restProps = $derived({
		...rest,
		tabindex: 0,
		role,
		'aria-hidden': role ? undefined : true,
		[createAttribute('focus-guard')]: '',
		style: HIDDEN_STYLES_STR,
	});
</script>

<span bind:this={ref} {...restProps}></span>
