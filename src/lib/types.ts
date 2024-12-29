import type { VirtualElement } from '@floating-ui/utils';
import type { FloatingContext } from './hooks/useFloating/index.svelte.js';

type OpenChangeReason =
	| 'outside-press'
	| 'escape-key'
	| 'ancestor-scroll'
	| 'reference-press'
	| 'click'
	| 'hover'
	| 'focus'
	| 'list-navigation'
	| 'safe-polygon';

export { type OpenChangeReason };

export type ReferenceType = Element | VirtualElement;

export interface ContextData {
	openEvent?: Event;
	floatingContext?: FloatingContext;
}

export interface FloatingEvents {
	emit<T extends string>(event: T, data?: any): void;
	on(event: string, handler: (data: any) => void): void;
	off(event: string, handler: (data: any) => void): void;
}

export interface FloatingRootContext<RT extends ReferenceType = ReferenceType> {
	dataRef: ContextData;
	open: boolean;
	onOpenChange: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;
	elements: {
		domReference: Element | null;
		reference: RT | null;
		floating: HTMLElement | null;
	};
	events: FloatingEvents;
	floatingId: string | undefined;
	refs: {
		setPositionReference(node: ReferenceType | null): void;
	};
}

export type FloatingContext<RT extends ReferenceType = ReferenceType> = Omit<
	UsePositionFloatingReturn<RT>,
	'refs' | 'elements'
> & {
	open: boolean;
	onOpenChange(open: boolean, event?: Event, reason?: OpenChangeReason): void;
	events: FloatingEvents;
	dataRef: React.MutableRefObject<ContextData>;
	nodeId: string | undefined;
	floatingId: string | undefined;
	refs: ExtendedRefs<RT>;
	elements: ExtendedElements<RT>;
};
