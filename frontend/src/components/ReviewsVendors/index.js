import React, {useEffect} from 'react';

import BoxItem from '../BoxItem/index.js';
import boxes from "../../data/boxes.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaHome, FaStar} from "react-icons/fa";

import {FaArrowLeft, FaSearch, FaMapMarkerAlt, FaCalendarCheck, FaUserAlt} from "react-icons/fa";

import {UserButton, useUser} from "@clerk/clerk-react";
import {globalData} from "../GreetingPage/global";


function ReviewsVendors() {

    const { user } = useUser();

    const navigate = useNavigate();

    const [shopsReviews, setShopReviews] = useState([]);
    const [shop, setShop] = useState([]);


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
                    <div className="header-option2">
                        <FaSearch></FaSearch>
                        <input className="searchQueryInput" type="text" placeholder="Cerca Box..." color="blue"/>


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
                            <div className="listings-grid-element2">

                                <div className="image3">
                                    <img
                                        src={require('../../data/sushi2.jpg')} alt="Listing pic"
                                    />
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


                            <div className="listings-grid-element4">

                                <div className="text2">
                                    <div className="text-title1">
                                        <h3>Media recensioni:</h3>
                                        <br></br>
                                        <div className="rating2">
                                            <span className="circle1">4.2</span></div>
                                        <br></br>
                                        <div className="info1">
                                            <h7>11 utenti hanno recensito questo locale</h7>
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