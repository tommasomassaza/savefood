import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaArrowLeft, FaStar} from 'react-icons/fa';

import { FaHome, FaCalendarCheck } from 'react-icons/fa';

import { UserButton, useUser } from '@clerk/clerk-react';

import Sidebar from '../HomePage/sidebar';
import { globalData } from '../GreetingPage/global';


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


function ReviewsPage() {
    const { user } = useUser();

    const [reviewText, setReviewText] = useState('');
    const [selectedStars, setSelectedStars] = useState(1);
    const [imageBlob, setImageBlob] = useState(null); // Stato per l'immagine Blob

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
            shopId: globalData.getGlobalShopsId(),
            userId: userId,
            userName: userName,
            description:  reviewText,
            stars: selectedStars
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

    const handleStarClick = (star) => {
        // Impedisci di scendere al di sotto di 1 nella valutazione
        const newSelectedStars = Math.max(1, star);
        setSelectedStars(newSelectedStars);
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
                            navigate('/home');
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
                    <div className="header-viewOptions1">
                        <div className="viewAll1" onClick={() => {
                            navigate("/box");

                        }}>
                            <span><FaArrowLeft/> Torna Indietro</span>
                        </div>

                    </div>
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

                            <div
                                className="listings-grid-element4"
                                style={{ maxHeight: 700, overflow: 'auto' }}
                            >
                                <div className="text2">
                                    <div className="text-title1">
                                        <h3>Media recensioni:</h3>
                                        <div className="rating2">
                                            <span className="circle1">{shop.stars}</span>
                                        </div>
                                        <div className="info1">
                                            <h7><strong>{shopsReviews.length}</strong> utenti hanno recensito questo locale</h7>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="labelp" htmlFor="inputRecensione">
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

                                    <div className="text2" ><div className="text-title1">
                                    <div className="rating-container">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                color={star <= selectedStars ? '#4FFFB0' : '#e4e5e9'}
                                                className="star"
                                                onMouseEnter={() => handleStarClick(star)}
                                                onClick={() => handleStarClick(star)}
                                            />
                                        ))} <br></br>
                                            <br></br>
                                        <button
                                            type="submit"
                                            className="btn btn-primary #198754 bg-success border-success"
                                            onClick={postReview}
                                        >
                                            Invia
                                        </button>
                                    </div></div>
                                    </div>


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

export default ReviewsPage;