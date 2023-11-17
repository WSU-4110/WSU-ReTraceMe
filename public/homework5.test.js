// Testing that all console log functions return the proper time and message for each function
markerCount = 0;

// Test trip start message
async function getStart() {
    markerCount = 0;
    timestamp = new Date().toLocaleString();
    //document.getElementById("consoleLog").value = "";
    //document.getElementById("consoleLog").value += `[${timestamp}]: A trip has been started\n`;
    return { count: markerCount, message: `[${timestamp}]: A trip has been started\n` };
}


test('Should return the current time and start trip message. Also markerCount should be reset to 0', async () => {
    const result = await getStart();
    timestamp = new Date().toLocaleString();

    expect(result.message).toBe(`[${timestamp}]: A trip has been started\n`);
    expect(result.count).toBe(0);
}); 






// Test marker placement message
async function getMarker() {
    markerCount += 1;
    timestamp = new Date().toLocaleString()
    //document.getElementById("consoleLog").value += `[${timestamp}]: Marker #${markerCount} placed\n`;
    return { message: `[${timestamp}]: Marker #${markerCount} placed\n` };
}


test('Should return proper time, marker number, and message', async () => {
    // Test 2 marker runs to ensure markerCount is getting counted properly
    const result1 = await getMarker();
    timestamp = new Date().toLocaleString();

    expect(result1.message).toBe(`[${timestamp}]: Marker #1 placed\n`);

    const result2 = await getMarker();
    timestamp = new Date().toLocaleString();

    expect(result2.message).toBe(`[${timestamp}]: Marker #2 placed\n`);
}); 








// Test marker removal message
async function getRemove() {
    timestamp = new Date().toLocaleString()
    //document.getElementById("consoleLog").value += `[${timestamp}]: Marker removed\n`;
    return { message: `[${timestamp}]: Marker removed\n` };
}


test('Should return current time and marker removed message', async () => {
    const result = await getRemove();
    timestamp = new Date().toLocaleString();

    expect(result.message).toBe(`[${timestamp}]: Marker removed\n`);
}); 








// Test all markers removed message
async function getRemoveAll() {
    timestamp = new Date().toLocaleString()
    //document.getElementById("consoleLog").value += `[${timestamp}]: All markers removed\n`;
    return { message: `[${timestamp}]: All markers removed\n` };
}


test('Should return correct time and  all markers removed message', async () => {
    const result = await getRemoveAll();
    timestamp = new Date().toLocaleString();

    expect(result.message).toBe(`[${timestamp}]: All markers removed\n`);
}); 









// Test end trip function
async function getEnd() {
    markerCount = 0;
    timestamp = new Date().toLocaleString()
    //document.getElementById("consoleLog").value += `[${timestamp}]: The trip has ended\n`;
    return { count: markerCount, message: `[${timestamp}]: The trip has ended\n` };
}


test('Should return the correct time and end trip message. Also markerCount should be reset to 0', async () => {
    const result = await getEnd();
    timestamp = new Date().toLocaleString();

    expect(result.message).toBe(`[${timestamp}]: The trip has ended\n`);
    expect(result.count).toBe(0);
}); 












async function getChange() {
    timestamp = new Date().toLocaleString()
    //document.getElementById("consoleLog").value += `[${timestamp}]: Toggled light/dark mode\n`;
    return { message: `[${timestamp}]: Toggled light/dark mode\n` };
}


test('Should return proper time and change mode message', async () => {
    const result = await getChange();
    timestamp = new Date().toLocaleString();

    expect(result.message).toBe(`[${timestamp}]: Toggled light/dark mode\n`);
}); 