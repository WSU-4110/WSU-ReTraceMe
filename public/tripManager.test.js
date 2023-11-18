const TripManager = require('./tripManager');

jest.mock('./markerManager');
jest.mock('./logManager');

describe('tripManager', () => {
    let tripManager;

    beforeEach(() => {
        tripManager = new TripManager();
    });

    describe('markTripAsStarted', () => {
        test('get 1000', () => {
            expect(tripManager.markTripAsStarted()).toBe(1000);
        });

        test('should clear console and call addToLog', () => {
            let spy = jest.spyOn(console,"log");
            let spy1 = jest.spyOn(tripManager.logManager, "clear");
            let spy2 = jest.spyOn(tripManager.logManager, "addToLog");

            tripManager.markTripAsStarted();

            expect(spy).toHaveBeenCalledWith("A trip has been started.");
            expect(spy1).toHaveBeenCalledTimes(1);
            expect(spy2).toHaveBeenCalledWith("A trip has been started.");
        });
    });

    describe('markTripAsEnded', () => {
        test('mark endLoop as false', () => {
            let spy = jest.spyOn(console,"log");
            let spy2 = jest.spyOn(tripManager.logManager, "addToLog");

            tripManager.markTripAsEnded();

            expect(tripManager.tripUtil.endLoop).toBe(false);
            expect(spy).toHaveBeenCalledWith("The trip has ended.");
        });
    });

    describe('startTrip', () => {
        test('should call markTripAsStarted', () => {
            let spy = jest.spyOn(tripManager, 'markTripAsStarted');

            tripManager.startTrip(1);

            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should call markTripAsEnded and not go into while loop', async () => {
            let spy = jest.spyOn(tripManager, 'markTripAsStarted');
            let spy4 = jest.spyOn(tripManager, 'markTripAsEnded');
            let spy2 = jest.spyOn(tripManager.tripUtil, 'sleep');
            let spy3 = jest.spyOn(tripManager.helper, 'getUserLocation');

            tripManager.tripUtil.endLoop = true;

            await tripManager.startTrip(1).then(() => {
                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy2).not.toHaveBeenCalled();
                expect(spy3).not.toHaveBeenCalled();
                expect(spy4).toHaveBeenCalled();
            });

        });
    });

});

