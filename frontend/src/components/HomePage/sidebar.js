import React, {useState} from "react";
import "./Sidebar.scss";
import {UserButton} from "@clerk/clerk-react";

import {FaAlignJustify} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    const handleSignOut = async () => {
        // Puoi eseguire azioni specifiche prima del sign out, se necessario

        await window.Clerk?.signOut();


        // Puoi eseguire azioni specifiche dopo il sign out
        navigate("/");
    };

    return (
        <div className="sidebar">
            {!sidebarOpen ? (
                <div className="sidebar_icon iconcina" onClick={handleSidebarOpen}>
                    <FaAlignJustify></FaAlignJustify>
                </div>
            ) : (
                <>
                    <div className="sidebar_icon" onClick={handleSidebarClose}>
                        <FaAlignJustify className="iconcina"></FaAlignJustify>
                    </div>
                    <div className="sidebar_items">
                        <div className="sidebar_item">
                            <i className="fas fa-home"></i>
                            <p onClick={() => {
                                navigate("/reservations");}}>I miei ordini</p>
                        </div>

                        <div className="sidebar_item">
                            <i className="fas fa-envelope"></i>
                            <UserButton onClick={handleSignOut}></UserButton>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
