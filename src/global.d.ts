/// <reference types="svelte" />

declare interface Probe {
    id: string;
    name: string;
    currentValue: number;
    targetValue: number;
    connected: boolean;
}