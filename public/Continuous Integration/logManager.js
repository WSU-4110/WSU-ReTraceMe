class LogManager {

    constructor() {
        this.consoleLog = document.getElementById("consoleLog");
    }

    clear() {
        this.consoleLog.value = "";
    }

    addToLog(thingToLog) {
        const timestamp = new Date().toLocaleString();
        this.consoleLog.value += `[${timestamp}]: ${thingToLog}\n`;
    }
}

module.exports = LogManager;