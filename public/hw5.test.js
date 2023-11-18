class LocationStorage {
    static storeLatitude(latitude) {
        localStorage.setItem("latitude", latitude);
    }

    static storeLongitude(longitude) {
        localStorage.setItem("longitude", longitude);
    }

    static storeTimestamp(timestamp) {
        localStorage.setItem("Timestamp", timestamp);
    }

    static retrieveLatitude() {
        return localStorage.getItem("latitude");
    }

    static retrieveLongitude() {
        return localStorage.getItem("longitude");
    }

    static retrieveTimestamp() {
        return localStorage.getItem("Timestamp");
    }
}

describe('LocationStorage', () => {
    // Mock localStorage before each test
    beforeEach(() => {
        const localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
        };
        global.localStorage = localStorageMock;
    });

    // Store Latitude
    it('should store latitude in localStorage', () => {
        const latitude = 40.7128;
        LocationStorage.storeLatitude(latitude);
        expect(localStorage.setItem).toHaveBeenCalledWith("latitude", latitude);
    });

    it('should store longitude in localStorage', () => {
        const longitude = -74.0060;
        LocationStorage.storeLongitude(longitude);
        expect(localStorage.setItem).toHaveBeenCalledWith("longitude", longitude);
    });

    // Store Timestamp
    it('should store timestamp in localStorage', () => {
        const timestamp = new Date().toISOString();
        LocationStorage.storeTimestamp(timestamp);
        expect(localStorage.setItem).toHaveBeenCalledWith("Timestamp", timestamp);
    });

    // Retrieve Latitude
    it('should retrieve latitude from localStorage', () => {
        const latitude = 40.7128;
        localStorage.getItem.mockReturnValue(latitude.toString());
        expect(LocationStorage.retrieveLatitude()).toBe(latitude.toString());
    });

    // Retrieve Longitude
    it('should retrieve longitude from localStorage', () => {
        const longitude = -74.0060;
        localStorage.getItem.mockReturnValue(longitude.toString());
        expect(LocationStorage.retrieveLongitude()).toBe(longitude.toString());
    });

    // Retrieve Timestamp
    it('should retrieve timestamp from localStorage', () => {
        const timestamp = new Date().toISOString();
        localStorage.getItem.mockReturnValue(timestamp);
        expect(LocationStorage.retrieveTimestamp()).toBe(timestamp);
    });

});