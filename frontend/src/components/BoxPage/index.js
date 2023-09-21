import React, {useEffect} from 'react';

import BoxItem from '../BoxItem/index.js';
import boxes from "../../data/boxes.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import {FaHome, FaMinus, FaPlus} from "react-icons/fa";
import {MdLocalDining} from "react-icons/md";

import {FaArrowLeft, FaCalendarCheck} from "react-icons/fa";
import { globalDataBox } from "../GreetingPage/global";

import {UserButton, useUser} from "@clerk/clerk-react";

import Sidebar from "../HomePage/sidebar";


function BoxPage() {

    //console.log(posts)
    const [box, setBoxes] = useState([]);



    let getBox = () => {
        fetch('http://localhost:8080/api/boxes?boxId='+ globalDataBox.globalBoxId)
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();

            })
            .then((result) => {
                    console.log(result);
                    setBoxes(result);
                    console.log(box);
                    console.log(box[0].price);
                },
                (error) => {
                    console.log(error);
                }
            )
    };




    const { user } = useUser();


    const navigate = useNavigate();


    const [quantity, setQuantity] = useState(1);

    const onMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const onPlus = () => {
        setQuantity(quantity + 1);
    };

    useEffect(() => {
        getBox();
    }, []);

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

                            {box.map((singleBox) => (
                                <BoxItem key={singleBox.boxId} box={singleBox} />
                            ))}


                            <div className="listings-grid-element1">
                                <div className="text1">
                                    <div className="text-title1" onClick={() => {
                                        navigate("/reviews");
                                    }}>
                                        <h3 class="reviews">La pizzera <MdLocalDining color="gold"></MdLocalDining></h3>
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
                                        navigate("/reviews");
                                    }}>
                                        <h6> Espandi tutto <FaEye color="green"></FaEye></h6>
                                    </div>
                                </div>

                            </div>
                            <div className="listings-grid-element1">

                            </div>

                            <div className="listings-grid-element2">

                                <div className="text2">
                                    <div className="text-title1">
                                        <h3>Totale: {quantity * box[0].price} €</h3>
                                        <div className="info1">
                                            <span> Prodotto: {box[0].name}</span>
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
                                        navigate("/payment");
                                    }}>
                                        <span>Prenota</span>
                                    </button>

                                </div>
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