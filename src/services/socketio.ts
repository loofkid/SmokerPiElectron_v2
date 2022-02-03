import { apiServerAddress } from "../constants";
import { io, Socket } from "socket.io-client";
import { probes, apiToStore } from "./probes";
import { heating, cooking } from "./smokerStatus";
import { writable } from "svelte/store";

export const ioConnected = writable(false);

export class SocketIO {
    constructor() {
        this.socket = io(apiServerAddress);
    }
    
    public socket: ReturnType<typeof io>;

    registerGlobalEvents = () => {
        if (this.socket.connected) ioConnected.set(true);
        this.socket.on("connected", () => {
            console.log("Socket connected. Listening to events.");
            ioConnected.set(true);
        });

        this.socket.on("connect_error", () => {
            ioConnected.set(false);
        });
        this.socket.on("disconnect", () => {
            ioConnected.set(false);
        });

        this.socket.on("valueRead", (apiProbes: {[name: string]: Probe}) => {
            probes.set(apiToStore(apiProbes));
        });

        this.socket.on("heatingOn", () => {
            heating.set(true);
        });

        this.socket.on("heatingOff", () => {
            heating.set(false);
        });
    }
}

export const socketio = new SocketIO();
Object.freeze(socketio);