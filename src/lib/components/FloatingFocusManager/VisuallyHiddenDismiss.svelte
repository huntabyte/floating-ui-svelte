<script lang="ts">
	import { HIDDEN_STYLES_STR } from '../FocusGuard/FocusGuard.svelte';
	import type { VisuallyHiddenDismissProps } from './types.js';

	let { ref = $bindable(null), children, ...rest }: VisuallyHiddenDismissProps = $props();
</script>

<button {...rest} bind:this={ref} tabindex="-1" style={HIDDEN_STYLES_STR} type="button">
	{@render children?.()}
</button>
