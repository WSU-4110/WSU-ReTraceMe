const Helper = require('./helper');
const TripManager = require("./tripManager");

describe('helper', () => {
    let helper;

    //let geoMock = jest.mock(navigator.geolocation);
   // navigator.geolocation.getCurrentPosition.mockResolvedValue({ lat: 123, lon: 456 });

    beforeEach(() => {
        helper = new Helper();
    });

    test('log geolocation not supported', () => {
        navigator.geolocation = undefined;

        let spy = jest.spyOn(console, 'log');

        helper.getUserLocation(1);

        expect(spy).toHaveBeenCalledWith("Geolocation is not supported by this browser.")
    });


    test('call getCurrentPosition', async () => {
        const mockCallback = jest.fn({lat: 123, lon: 456});
        navigator.geolocation = true;

        helper.getUserLocation(mockCallback);

        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
});