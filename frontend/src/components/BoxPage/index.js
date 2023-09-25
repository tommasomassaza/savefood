import React, {useEffect} from 'react';

import BoxItem from '../BoxItem/index.js';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import {FaHome, FaMinus, FaPlus} from "react-icons/fa";
import {MdLocalDining} from "react-icons/md";

import {FaArrowLeft, FaCalendarCheck} from "react-icons/fa";
import {
    globalBoxName,
    globalBoxPickUpTime,
    globalBoxPrice,
    globalBoxShopId, globalData,
    globalDataBox
} from "../GreetingPage/global";

import {globalBoxQuantity} from "../GreetingPage/global";

import {UserButton, useUser} from "@clerk/clerk-react";

import Sidebar from "../HomePage/sidebar";


function BoxPage() {

    const navigate = useNavigate();

    //console.log(posts)
    const [box, setBox] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleConfirmation = () => {
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            navigate('/reservations');
        }, 1500); // Il messaggio scomparirà dopo 4 secondi (4000 millisecondi)

    };

    useEffect(() => {
        getBox();
    }, []);

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


    let getBox = () => {
        fetch('http://localhost:8080/api/boxes/getById/'+ globalDataBox.globalBoxId)
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
                    console.log("questo è l'id della box:" + globalDataBox.globalBoxId);
                },
                (error) => {
                    console.log(error);
                }
            )
    };

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


    const setShopId = (shopId) => {
        globalData.globalShopsId = shopId; // Utilizza la funzione di impostazione
    };




    const [quantity, setQuantity] = useState(1);
    globalBoxQuantity.globalBoxQuantity = quantity

    const onMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            globalBoxQuantity.globalBoxQuantity = quantity-1;
            globalBoxPrice.globalPrice = box.price*quantity;
        }
    };

    const onPlus = () => {

        console.log("sono qui:"+box.quantity);
        if(quantity < box.quantity ){
        setQuantity(quantity + 1);
        globalBoxQuantity.globalBoxQuantity = quantity+1;
        globalBoxPrice.globalPrice = box.price*quantity;

        }
    };



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
                    <div className="header-option1"onClick={() => {
                        navigate("/");
                    }}>
                        <span>Home <FaHome></FaHome></span>
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
                    <div className="header1">
                        <div className="header-title1">
                            <h2>Prenota Box</h2>
                        </div>
                        <div className="header-viewOptions1">
                            <div className="viewAll1" onClick={() => {
                                navigate("/");
                                navigate(0);
                            }}>
                                <span> <FaArrowLeft/> Torna alla Home</span>
                            </div>


                        </div>
                    </div>
                    <div className="listings-grid1">
                        <div className="listings-col1">


                                <BoxItem box={box} />



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
                                        <span> Matteo Rossi: recensione...</span>
                                    </div>
                                </div>
                                <div className="text1">
                                    <div className="info1">
                                        <span> Mirco Bianchi: recensione...</span>
                                    </div>
                                </div>
                                <div className="text1">
                                    <div className="info1" onClick={() => {
                                        setShopId(box.shopId)
                                        navigate("/reviews");
                                    }}>
                                        <h6> Recensioni del locale <FaEye color="green"></FaEye></h6>
                                    </div>
                                </div>

                            </div>
                            <div className="listings-grid-element1">

                            </div>

                            <div className="listings-grid-element2">

                                <div className="text2">
                                    <div className="text-title1">
                                        <h3>Totale: {quantity * box.price} €</h3>
                                        <div className="info1">
                                            <span> Prodotto: {box.name}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="container2">
                                    <h4>Quantità: {quantity}</h4>
                                    <button className="options-btn1 selected1" onClick={onMinus}>
                                        <span><FaMinus></FaMinus></span>
                                    </button>
                                    <button className="options-btn1 selected1" onClick={onPlus}>
                                        <span><FaPlus></FaPlus></span>
                                    </button>
                                    <button className="options-btn1 prenota1" onClick={() => {
                                        postOrdine();
                                        handleConfirmation(); // Chiamiamo handleConfirmation dopo aver eseguito l'azione desiderata

                                    }}>
                                        <span>Prenota</span>
                                    </button>

                                </div>
                                {showConfirmation && (
                                    <div className="confirmation-message">
                                        La box è stata aggiunta con successo
                                    </div>
                                )}
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </div>


        </body>


    );
}

export default BoxPage;