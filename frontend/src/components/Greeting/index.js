import {isLoaded, useUser, SignIn} from "@clerk/clerk-react";

import React, {useState, useEffect} from "react";


function Greeting() {

    // Use the useUser hook to get the Clerk.user object
    // This hook causes a re-render on user changes
    const {isLoaded, isSignedIn, user} = useUser();

    if (!isLoaded || !isSignedIn) {
        // You can handle the loading or signed state separately
        return null;
    }

    return <div>{user.id}</div>;
}

export default Greeting;