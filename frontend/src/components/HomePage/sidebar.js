import React, {useState} from "react";
import "./Sidebar.scss";
import {UserButton} from "@clerk/clerk-react";

import {FaAlignJustify} from "react-icons/fa";

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
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
                            <p>I miei ordini</p>
                        </div>
                        <div className="sidebar_item">
                            <i className="fas fa-user"></i>
                            <p>google maps</p>
                        </div>
                        <div className="sidebar_item">
                            <i className="fas fa-envelope"></i>
                            <UserButton></UserButton>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;