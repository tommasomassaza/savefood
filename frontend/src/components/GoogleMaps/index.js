const getCityFromCoordinates = (latitude, longitude) => {
    const apiKey = 'AIzaSyBQB5aIi5u1iUMCW-iWGumBFxo7jrB_r-k';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'OK') {
                const results = data.results;
                for (const result of results) {
                    for (const component of result.address_components) {
                        if (component.types.includes('locality')) {
                            return component.long_name; // Restituisci il nome della città
                        }
                    }
                }
            } else {
                throw new Error('Errore nella richiesta di geocoding');
            }
        });
};

export default getCityFromCoordinates;
