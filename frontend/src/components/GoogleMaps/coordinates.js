import React, { useEffect } from 'react';
import getCityFromCoordinates from './index.js'; // Assicurati di importare la funzione

const Coordinates = () => {
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    getCityFromCoordinates(latitude, longitude)
                        .then((city) => {
                            console.log(`Coordinate: Latitudine ${latitude}, Longitudine ${longitude}`);
                            console.log(`Nome della città: ${city}`);
                        })
                        .catch((error) => {
                            console.error('Errore nell\'ottenere il nome della città:', error);
                        });
                },
                (error) => {
                    console.error('Errore nell\'ottenere la posizione:', error.message);
                }
            );
        } else {
            console.error('Geolocalizzazione non supportata dal tuo browser.');
        }
    }, []);

    return null; // Questo componente non renderà nulla
};

export default Coordinates;
