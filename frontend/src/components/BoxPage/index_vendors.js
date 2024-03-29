import React, {useEffect, useState} from 'react';

import BoxItemOwner from '../BoxItem/indexowner.js';
import {useNavigate} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import {MdLocalDining} from "react-icons/md";

import {FaArrowLeft, FaSearch, FaMapMarkerAlt, FaCalendarCheck, FaUserAlt} from "react-icons/fa";

import {UserButton, useUser} from "@clerk/clerk-react";
import {globalData, globalDataBox} from "../GreetingPage/global";
import Sidebar from "../HomePage/sidebar";


function BoxPageVendor() {
    const { user } = useUser();

    const [box, setBox] = useState([]);
    const [shop, setShop] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        getBox();
        getShop();
    }, []);

    const setShopId = (shopId) => {
        globalData.setGlobalShopsId(shopId); // Utilizza la funzione di impostazione
    };

    let userId = null; // Inizializza userId come null
    let userName = null; // Inizializza userId come null
    if (user) {
        userId = user.id; // Assegna il valore solo se user è definito
        userName = user.primaryEmailAddress.emailAddress;
        console.log(userId);
        console.log(userName);
    }


    let getBox = () => {
        fetch('http://localhost:8080/api/boxes/getById/'+ globalDataBox.getGlobalBoxId())
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();

            })
            .then((result) => {
                    console.log(result);
                    setBox(result);
                    console.log(box);
                    console.log(box.price);
                    console.log("questo è l'id della box:" + globalDataBox.getGlobalBoxId());
                },
                (error) => {
                    console.log(error);
                }
            )
    };

    let getShop = () => {
        fetch('http://localhost:8080/api/shops/getById/' + globalData.getGlobalShopsId())
            .then((res) => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();
            })
            .then(
                (result) => {
                    console.log(result);
                    setShop(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }

        return text;
    };


    return (

        <body>


        <header>
            <div className="container1">
                <div className="logo1" onClick={() => {
                    navigate("/modifyshop2");
                }}>
                    <h1>Save<span>Food</span></h1>
                </div>
                <div className="currentDetails1">
                    <div className="header-option1" onClick={() => {
                        navigate("/reservations");
                    }}>
                        <i data-feather="clock"></i>
                        <span>I miei ordini <FaCalendarCheck></FaCalendarCheck></span>
                    </div>
                </div>


                <div className="searchBar1">
                    <div className="header-option1">


                    </div>
                    <div className="header-option1">
                    {user ? (
         <UserButton show={true} />
      ) : (
        <button onClick={() => {
            navigate("/sign-in");
        }}>Accedi</button>
      )}
                    </div>
                </div>
            </div>
        </header>

        <div className="options1">
            <Sidebar className="barra"></Sidebar>

            <div className="listings1">
                <div className="container1">
                    <div className="header-viewOptions1">
                        <div className="viewAll1" onClick={() => {
                            navigate("/vendors/homepage");

                        }}>
                            <span><FaArrowLeft/> Torna alla Home</span>
                        </div>
                    </div>
                    <div className="listings-grid1">
                        <div className="listings-col1">

                            <BoxItemOwner box={box}></BoxItemOwner>


                            <div className="listings-grid-element1">
                                <div className="text1">
                                    <div className="text-title1" onClick={() => {
                                        navigate("/reviews");
                                    }}>
                                        <h3 class="reviews">{box.name} <MdLocalDining color="gold"></MdLocalDining></h3>
                                    </div>
                                </div>

                                <div className="text1">
                                    <div className="info1">
                                        {shop && shop.address && (
                                            <span>Indirizzo: {truncateText(shop.address, 30)}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="text1">
                                    <div className="info1">
                                        {shop && shop.telephoneNumber &&(
                                            <span>Telefono: {truncateText(shop.telephoneNumber, 30)}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="text1">
                                    <div className="info1" onClick={() => {
                                        setShopId(box.shopId);
                                        navigate("/reviewsvendors");
                                    }}>
                                        <h6> Recensione locale <FaEye color="green"></FaEye></h6>
                                    </div>
                                </div>

                            </div>
                            <div className="listings-grid-element1">

                            </div>


                        </div>


                    </div>


                </div>
            </div>
        </div>


        </body>


    );
}

export default BoxPageVendor;