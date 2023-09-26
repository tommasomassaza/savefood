const Coordinates = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Coordinate: Latitudine ${latitude}, Longitudine ${longitude}`);
        }, (error) => {
            console.error("Errore nell'ottenere la posizione:", error.message);
        });
    } else {
        console.error("Geolocalizzazione non supportata dal tuo browser.");
    }
};

export default Coordinates;