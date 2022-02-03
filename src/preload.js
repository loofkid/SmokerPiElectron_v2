const { contextBridge } = require("electron");
const networkInterfaces = require("os").networkInterfaces;
const ping = require("ping");

contextBridge.exposeInMainWorld("api", {
    networkInterfaces: () => networkInterfaces(),
});