import {useUser} from "@clerk/clerk-react";

import React, {useEffect} from "react";


function Greeting() {

    // Use the useUser hook to get the Clerk.user object
    // This hook causes a re-render on user changes
    const {user} = useUser();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get("role");
        try {
            user.update({
                unsafeMetadata: {
                    role: role
                }
            });
            console.log("Ruolo impostato con successo:", role);
        } catch (error) {
            console.error("Errore nell'impostazione del ruolo:", error);
        }

        // Continua con le azioni necessarie utilizzando il valore del ruolo
    }, []);


    const getRole = () => {
        return user?.unsafeMetadata?.role || "";
    };
}

export default Greeting;