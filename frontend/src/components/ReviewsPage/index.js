import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import { FaHome, FaCalendarCheck } from 'react-icons/fa';

import { UserButton, useUser } from '@clerk/clerk-react';

import Sidebar from '../HomePage/sidebar';
import { globalData, globalDataBox } from '../GreetingPage/global';

function ReviewsPage() {
    const { user } = useUser();

    const [reviewText, setReviewText] = useState('');

    const navigate = useNavigate();

    const [shopsReviews, setShopReviews] = useState([]);
    const [shop, setShop] = useState([]);

    let userId = null; // Inizializza userId come null
    let userName = null; // Inizializza userId come null
    if (user) {
        userId = user.id; // Assegna il valore solo se user è definito
        userName = user.primaryEmailAddress.emailAddress;
        console.log(userId);
        console.log(userName);
    }

    const postReview = () => {
        // Effettua una richiesta HTTP POST al server con il testo della recensione
        const requestBody = {
            shopId: globalData.globalShopsId,
            userId: userId,
            userName: userName,
            description:  reviewText,
            stars: "1"
            // Altri campi necessari, se presenti
        };

        fetch('http://localhost:8080/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Aggiungi qui l'header per l'autenticazione se necessario
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    // La recensione è stata inviata con successo
                    // Puoi fare qualcosa qui, ad esempio resettare il campo di input
                    setReviewText('');
                    // Dopo l'invio, aggiorna la lista delle recensioni chiamando getShopReview
                    getShopReview();
                } else {
                    // Gestisci il caso in cui l'invio non ha avuto successo
                }
            })
            .catch((error) => {
                console.error('Errore durante l\'invio della recensione:', error);
            });
    };

    let getShopReview = () => {
        fetch('http://localhost:8080/api/reviews/' + globalData.globalShopsId)
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
        fetch('http://localhost:8080/api/shops/getById/' + globalData.globalShopsId)
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
                <div
                    className="logo1"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <h1>
                        Save<span>Food</span>
                    </h1>
                </div>
                <div className="currentDetails1">
                    <div
                        className="header-option1"
                        onClick={() => {
                            navigate('/');
                        }}
                    >
              <span>
                Home <FaHome></FaHome>
              </span>
                    </div>
                    <div
                        className="header-option1"
                        onClick={() => {
                            navigate('/reservations');
                        }}
                    >
              <span>
                I miei ordini <FaCalendarCheck></FaCalendarCheck>
              </span>
                    </div>
                </div>

                <div className="searchBar1">
                    <div className="header-option1"></div>
                    <div className="header-option1">
                        {user ? (
                            <UserButton show={true} />
                        ) : (
                            <button
                                onClick={() => {
                                    navigate('/sign-in');
                                }}
                            >
                                Accedi
                            </button>
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
                            <h2>Locale: "{shop.name}"</h2>
                        </div>
                        <div className="header-viewOptions1"></div>
                    </div>
                    <div className="listings-grid1">
                        <div className="listings-col1">
                            <div
                                className="listings-grid-element2"
                                style={{ overflow: 'auto' }}
                            >
                                <div className="image3">
                                    <img
                                        src={require('../../data/sushi2.jpg')}
                                        alt="Listing pic"
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

                            <div
                                className="listings-grid-element4"
                                style={{ maxHeight: 700, overflow: 'auto' }}
                            >
                                <div className="text2">
                                    <div className="text-title1">
                                        <h3>Media recensioni:</h3>
                                        <div className="rating2">
                                            <span className="circle1">4.2</span>
                                        </div>
                                        <div className="info1">
                                            <h11>11 utenti hanno recensito questo locale</h11>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label class="labelp" for="inputRecensione">
                                            Dacci il tuo feedback!
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputRecensione"
                                            minLength="10"
                                            maxLength="200"
                                            required
                                            placeholder="Scrivi una recensione..."
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary #198754 bg-success border-success"
                                        onClick={postReview}
                                    >
                                        Invia
                                    </button>
                                </div>

                                {shopsReviews.map((review, index) => (
                                    <div className="text2" key={index}>
                                        <div className="text-title1">
                                            <h4>
                                                {review.userName}: {review.rating}{' '}
                                                <FaStar color="#4FFFB0"></FaStar>
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

export default ReviewsPage;