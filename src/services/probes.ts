import { writable, type Writable } from "svelte/store";

const defaultProbes: Probe[] = [
    {
        id: "chamberProbe",
        name: "Chamber",
        currentValue: 75,
        targetValue: 0,
        connected: true,
    },
    {
        id: "probe1",
        name: "Probe 1",
        currentValue: 75,
        targetValue: 0,
        connected: false,
    },
    {
        id: "probe2",
        name: "Probe 2",
        currentValue: 75,
        targetValue: 0,
        connected: false,
    },
    {
        id: "probe3",
        name: "Probe 3",
        currentValue: 75,
        targetValue: 0,
        connected: false,
    },
    {
        id: "probe4",
        name: "Probe 4",
        currentValue: 75,
        targetValue: 0,
        connected: false,
    },
]

export const probes = writable(defaultProbes);
export const maxTargetTemp = writable(500);

export const apiToStore = (apiProbes: {[name: string]: Probe}) => {
    let storeProbes: Probe[] = [];
    for (const probe in apiProbes) {
        storeProbes = [...storeProbes, apiProbes[probe]];
    }
    return storeProbes;
}