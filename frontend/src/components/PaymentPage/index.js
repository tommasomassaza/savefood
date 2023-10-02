import React, {useEffect} from 'react';

import boxes from "../../data/boxes.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

import {globalBoxName, globalBoxPrice,globalBoxPickUpTime,globalBoxQuantity,globalBoxShopId,globalDataBox} from "../GreetingPage/global";

import {FaArrowLeft, FaSearch, FaMapMarkerAlt, FaCalendarCheck, FaUserAlt} from "react-icons/fa";
import {useUser} from "@clerk/clerk-react";
import {UserButton} from "@clerk/clerk-react";


function PaymentPage() {
    const [count, setCount] = useState(0);
    const { user } = useUser();
    console.log("questo è il nome: " + globalBoxName.globalName)

    let userId = null; // Inizializza userId come null
    let userName = null; // Inizializza userId come null
    if (user) {
        userId = user.id; // Assegna il valore solo se user è definito
        userName = user.primaryEmailAddress.emailAddress;
        console.log(userId);
        console.log(userName);
    }


    let postOrdine = () => {
        // Crea un oggetto con i dati da inviare
        const dataToSend = {
            boxId: globalDataBox.globalBoxId,
            boxName: globalBoxName.globalName,
            userId: userId,
            userName: userName,
            shopId: globalBoxShopId.globalBoxShopId,
            quantity:globalBoxQuantity.globalBoxQuantity,
            price: globalBoxPrice.globalPrice,
            pickUpTime: globalBoxPickUpTime.globalPickUpTime
        };

        // Invia dataToSend al tuo backend
        fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Imposta l'header "Content-Type"
            },
            body: JSON.stringify(dataToSend) // Serializza l'oggetto in una stringa JSON
        })
            .then((res) => {
                console.log(res.status);
                console.log(res.headers);
            })
            .catch((error) => {
                console.error({
                    error,
                });
            });
    };
/*
    useEffect(() => {
        //postOrdine();
        // Incrementa il contatore ad ogni chiamata di useEffect
        setCount((prevCount) => prevCount + 1);

        // Stampa il valore del contatore
        console.log(`Il contatore è: ${count}`);
    }, []);*/

    const box = boxes[window.id]; /*window.id è una variabile globale definita in BoxItem, usata per caricare la box dall'id corretto nella BoxPage*/

    const navigate = useNavigate();

    return (

        <body>


        <header>
            <div className="container1">
                <div className="logo1" onClick={() => {
                    navigate("/");
                }}>
                    <h1>Save<span>Food</span></h1>
                </div>
                <div className="currentDetails1">
                    <div className="header-option1">
                        <i data-feather="map-pin"></i>
                        <span>Google Maps <FaMapMarkerAlt></FaMapMarkerAlt></span>
                    </div>
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
                        <UserButton></UserButton>
                    </div>
                </div>
            </div>
        </header>

        <div className="options1">


            <div className="listings1">
                <div className="container1">
                    <div className="header1">
                        <div className="header-title1">
                            <h2></h2>
                        </div>
                        <div className="header-viewOptions1">
                            <div className="viewAll1" onClick={() => {
                                navigate("/home");
                                navigate(0);
                            }}>
                                <span><FaArrowLeft/> Torna alla Home</span>
                            </div>


                        </div>
                    </div>
                    <div className="listings-grid1">
                        <div className="listings-col1">

                            <div className="listings-grid-element1">


                            </div>
                            <div className="listings-grid-element1">
                                <div className="text1">
                                    <div className="text-title1" onClick={() => {
                                        navigate("/reviews");
                                    }}>
                                        <h3 class="reviews"></h3>
                                    </div>
                                </div>

                                <PayPalScriptProvider
                                    options={{"client-id": "Abt6r-zARuNMn7iWz5AMqT58-zaCMS3xcz6zZl2fXoVq0e3w3o9s9SsUjSdh28i1hHnru4dcO2Oy1va6"}}
                                >
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: "0.01",
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            const details = await actions.order.capture();
                                            const name = details.payer.name.given_name;
                                            postOrdine();

                                            alert("Transazione completata da: " + name);
                                        }}
                                    />
                                </PayPalScriptProvider>
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

export default PaymentPage;