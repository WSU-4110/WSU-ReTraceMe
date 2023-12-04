class markerLog {
    markerCount = 0;

    constructor() {
        const timestamp = new Date().toLocaleString();
        this.markerCount += 1;
        this.log = `[${timestamp}]: Marker #${this.markerCount} placed\n`;
    }

    getLog() {
        document.getElementById("consoleLog").value += this.log;
    }
}

module.exports = markerLog;