
document.addEventListener("DOMContentLoaded", () => {
    const getLocationButton = document.getElementById("getLocation");
    const coordinatesDiv = document.getElementById("coordinates");

    getLocationButton.addEventListener("click", () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                coordinatesDiv.innerHTML = `Coordinate: Latitudine ${latitude}, Longitudine ${longitude}`;
            }, (error) => {
                console.error("Errore nell'ottenere la posizione:", error.message);
                coordinatesDiv.innerHTML = "Impossibile ottenere la posizione.";
            });
        } else {
            coordinatesDiv.innerHTML = "Geolocalizzazione non supportata dal tuo browser.";
        }
    });
});
