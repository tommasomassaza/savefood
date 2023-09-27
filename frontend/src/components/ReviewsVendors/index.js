import React, {useEffect} from 'react';

import BoxItem from '../BoxItem/index.js';
import boxes from "../../data/boxes.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaHome, FaStar} from "react-icons/fa";

import {FaArrowLeft, FaSearch, FaMapMarkerAlt, FaCalendarCheck, FaUserAlt} from "react-icons/fa";

import {UserButton, useUser} from "@clerk/clerk-react";
import {globalData} from "../GreetingPage/global";
import Sidebar from "../HomePage/sidebar";


// Funzione per convertire una stringa Base64 in un oggetto Blob
function base64ToBlob(base64String, contentType) {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
}


function ReviewsVendors() {

    const { user } = useUser();

    const navigate = useNavigate();

    const [shopsReviews, setShopReviews] = useState([]);
    const [shop, setShop] = useState([]);
    const [imageBlob, setImageBlob] = useState(null); // Stato per l'immagine Blob


    let getShopReview = () => {
        fetch('http://localhost:8080/api/reviews/' + globalData.getGlobalShopsId())
            .then((res) => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();
            })
            .then(
                (result) => {
                    console.log(result);
                    setShopReviews(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    let getShopById = () => {
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


    useEffect(() => {
        getShopReview();
        getShopById();
    }, []);

    // Effettua la conversione dell'immagine quando il componente viene montato
    useEffect(() => {
        if (shop.image) {
            const blob = base64ToBlob(shop.image, "image/jpeg"); // Cambia il tipo MIME in base al tuo tipo di immagine
            setImageBlob(URL.createObjectURL(blob));
        }
    }, [shop.image]);


    return (

        <body>
        <header>
            <div className="container1">
                <div className="logo1" onClick={() => {
                    navigate("/greeting_page");}}>
                    <h1>Save<span>Food</span></h1>
                </div>
                <div className="currentDetails1">
                    <div className="header-option1" onClick={() => {
                        navigate("/vendors/homepage");}}>
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
                        <UserButton></UserButton>
                    </div>
                </div>
            </div>
        </header>

        <div className="options1">

            <Sidebar className="barra"></Sidebar>
            <div className="listings1">
                <div className="container1">
                    <div className="header-viewOptions1">
                        <div className="header-title1">
                            <h2>Locale: "{shop.name}"</h2>
                        </div>
                        <div className="header-viewOptions1">
                            <div className="viewAll1" onClick={() => {
                                navigate("/modifyshop2");
                            }}>
                                <span><FaArrowLeft/> Torna alla Home</span>
                            </div>


                        </div>
                    </div>
                    <div className="listings-grid1">
                        <div className="listings-col1">
                            <div className="listings-grid-element2"
                                 style={{ overflow: 'auto' }}
                            >

                                <div className="image3">
                                    {/* Utilizza l'URL dell'immagine Blob */}
                                    {imageBlob && <img src={imageBlob} alt="prova" />}
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h5>Nome:</h5>
                                        <div className="info1">
                                            <h7> {shop.name}</h7>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h5>Città:</h5>
                                        <div className="info1">
                                            <h7> {shop.city}</h7>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h5>Indirizzo:</h5>
                                        <div className="info1">
                                            <h7> {shop.address}</h7>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h5>Numero di telefono:</h5>
                                        <div className="info1">
                                            <h7> {shop.telephoneNumber}</h7>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h5>Descrizione:</h5>
                                        <div className="info1">
                                            <h7> {shop.description}</h7>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="listings-grid-element4"
                                 style={{ maxHeight: 700, overflow: 'auto' }}
                            >

                                <div className="text2">
                                    <div className="text-title1">
                                        <h3>Media recensioni:</h3>
                                        <br></br>
                                        <div className="rating2">
                                            <span className="circle1">{shop.stars}</span></div>
                                        <br></br>
                                        <div className="info1">
                                            <h7><strong>{shopsReviews.length}</strong> utenti hanno recensito questo locale</h7>
                                        </div>

                                    </div>
                                </div>

                                <div class="form-row">


                                </div>

                                {shopsReviews.map((review, index) => (
                                    <div className="text2" key={index}>
                                        <div className="text-title1">
                                            <h4>
                                                {review.userName}:{' '}
                                                {Array.from({ length: review.stars }).map((_, starIndex) => (
                                                    <FaStar key={starIndex} color="#4FFFB0" />
                                                ))}
                                            </h4>
                                            <div className="info1">
                                                <span> {review.description} </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </div>


        </body>


    );
}

export default ReviewsVendors;