jest.useFakeTimers();

test('sleep function pauses execution for specified time', async () => {
  const sleep = require('./sleepFunctions.js');

  const callback = jest.fn();

  sleep(1000).then(callback);

  expect(callback).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1000);

  await Promise.resolve(); 
  expect(callback).toHaveBeenCalled();
});
