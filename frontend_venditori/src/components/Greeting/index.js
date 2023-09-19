import {useUser} from "@clerk/clerk-react";

import React, {useEffect} from "react";

import { globalRole } from "../GreetingPage/global"; // Importa la variabile globale




function Greeting() {

    // Use the useUser hook to get the Clerk.user object
    // This hook causes a re-render on user changes
    const {user} = useUser();

    useEffect(() => {
       
        const returned_role = getRole()

        const new_role = "cliente_venditore"

        console.log("Il ruolo ottenuto è:", returned_role);


        if(returned_role === "cliente"){
        try {
            user.update({
                unsafeMetadata: {
                    role: "cliente_venditore"
                }
            });
            console.log("Ruolo impostato con successo:", "cliente_venditore");
        } catch (error) {
            console.error("Errore nell'impostazione del ruolo:", error);
        }

        // Continua con le azioni necessarie utilizzando il valore del ruolo
    }
    if(returned_role !== "cliente"){
        try {
            user.update({
                unsafeMetadata: {
                    role: "cliente"
                }
            });
            console.log("Ruolo impostato con successo:", "venditore");
        } catch (error) {
            console.error("Errore nell'impostazione del ruolo:", error);
        }

    }}, []);

    const getRole = () => {
        return user?.unsafeMetadata?.role || "";
};

}

export default Greeting;