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
    // Store Latitude
    it('should store latitude in localStorage', () => {
        const latitude = 40.7128;
        LocationStorage.storeLatitude(latitude);
        expect(LocationStorage.retrieveLatitude()).toBe(latitude.toString());
    });

    // Store Longitude
    it('should store longitude in localStorage', () => {
        const longitude = -74.0060;
        LocationStorage.storeLongitude(longitude);
        expect(LocationStorage.retrieveLongitude()).toBe(longitude.toString());
    });

    // Store Timestamp
    it('should store timestamp in localStorage', () => {
        const timestamp = new Date().toISOString();
        LocationStorage.storeTimestamp(timestamp);
        expect(LocationStorage.retrieveTimestamp()).toBe(timestamp);
    });

    // Retrieve Latitude
    it('should retrieve latitude from localStorage', () => {
        const latitude = 40.7128;
        localStorage.setItem("latitude", latitude.toString());
        expect(LocationStorage.retrieveLatitude()).toBe(latitude.toString());
    });

    // Retrieve Longitude
    it('should retrieve longitude from localStorage', () => {
        const longitude = -74.0060;
        localStorage.setItem("longitude", longitude.toString());
        expect(LocationStorage.retrieveLongitude()).toBe(longitude.toString());
    });

    // Retrieve Timestamp
    it('should retrieve timestamp from localStorage', () => {
        const timestamp = new Date().toISOString();
        localStorage.setItem("Timestamp", timestamp);
        expect(LocationStorage.retrieveTimestamp()).toBe(timestamp);
    });
});