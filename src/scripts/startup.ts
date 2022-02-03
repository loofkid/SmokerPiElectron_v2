import { probes, maxTargetTemp } from "../services/probes.js";
import { heating, cooking } from "../services/smokerStatus"
import { getProbes, getHeating, getMaxTemp } from "../services/smokerPiAPI.js";
import { socketio, ioConnected } from "../services/socketio.js";

const {socket, registerGlobalEvents} = socketio; 

export const startup = async () => {
    const socketio = socket;
    try {
        probes.set(await getProbes());
        heating.set(await getHeating());
        maxTargetTemp.set(await getMaxTemp());
        maxTargetTemp.subscribe((value) => console.log(value));
    } catch {
        socketio.on("connected",  async () => {
            ioConnected.set(true);
            probes.set(await getProbes());
            heating.set(await getHeating());
            maxTargetTemp.set(await getMaxTemp());
        });
    }
    registerGlobalEvents();
}