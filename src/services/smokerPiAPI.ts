import { apiServerAddress } from "../constants";
import { apiToStore } from "./probes";

export const getProbes = async () => {
    let probes: Probe[] = [];
    const response = await fetch(`${apiServerAddress}/api/probes`);
    const result: {[name: string]: Probe} = await response.json();

    if (response.ok) {
        probes = apiToStore(result);
        return probes;
    }
    else {
        const error = response.statusText;
        console.error(error);
        return Promise.reject(error);
    }
}

export const getHeating = async () => {
    const response = await fetch(`${apiServerAddress}/api/heating`);
    const result = await response.text();

    if (response.ok) {
        const value = result === "true" ? true : false;
        return value;
    }
    else {
        const error = response.statusText;
        console.error(error);
        return Promise.reject(error);
    }
}

export const getMaxTemp = async () => {
    const response = await fetch(`${apiServerAddress}/api/probes/maxtargettemp`);
    const result = await response.text();

    if (response.ok) {
        const value = parseInt(result);
        return value;
    }
    else {
        const error = response.statusText;
        console.error(error);
        return Promise.reject(error);
    }
}

export const setTargetTemp = async (probeId: string, targetTemp: number) => {
    const response = await fetch(`${apiServerAddress}/api/probes/${probeId}/target/${targetTemp}`);
    const result: Promise<Probe> = await response.json();

    if (response.ok) {
        return result;
    }
    else {
        const error = response.statusText;
        console.error(error);
        return Promise.reject(error);
    }
}