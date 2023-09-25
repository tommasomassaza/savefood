import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import boxes from '../../data/boxes.json';
import {useUser} from "@clerk/clerk-react";
import {FaArrowLeft, FaCalendarCheck, FaHome, FaSearch} from "react-icons/fa";
import Greeting from "../Greeting";
import {globalData} from "../GreetingPage/global";

function ModifyNegozio() {
    const { user } = useUser();
    const [image, setImage] = useState('');
    const [allImage, setAllImage] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [imagePreview, setImagePreview] = useState('');


    let userId = null; // Inizializza userId come null

    if (user) {
        userId = user.id; // Assegna il valore solo se user è definito
        console.log(userId);
    }

    const [shop, setShop] = useState([]);

    const [formData, setFormData] = useState({
        shopId: globalData.getGlobalShopsId(), // Passo lo shopId
        sellerId: userId, // Utilizza userId qui
        name: '',
        city: '',
        address: '',
        description: '', // Corretto il nome del campo 'description'
        telephonNumber: '', // Corretto il nome del campo 'telephonNumber'
        image: image
    });

    const navigate = useNavigate();
    const box = boxes[window.id];

    const convertToByteArray = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const arrayBuffer = reader.result;
            const byteArray = new Uint8Array(arrayBuffer);

            setImage(byteArray); // Salva l'immagine come array di byte
            setImagePreview(URL.createObjectURL(file)); // Imposta l'anteprima dell'immagine
        };

        reader.readAsArrayBuffer(file);
    };

    const handleConfirmation = () => {
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            navigate('/vendors/homepage');
        }, 1500); // Il messaggio scomparirà dopo 4 secondi (4000 millisecondi)
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Crea un nuovo oggetto formData solo con i dati necessari
        const formDataToSend = new FormData();
        formDataToSend.append('shopId', formData.shopId);
        formDataToSend.append('sellerId', formData.sellerId);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('telephonNumber', formData.telephonNumber);
        formDataToSend.append('image', new Blob([image], { type: 'image/jpeg' })); // Usa 'image/jpeg' o il tipo di immagine corretto

        // Invia formDataToSend al tuo backend
        fetch('http://localhost:8080/api/shops', {
            method: 'PUT',
            body: formDataToSend,
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

        handleConfirmation(); // Chiamiamo handleConfirmation dopo aver eseguito l'azione desiderata
    };


    let getShop = () => {
        fetch('http://localhost:8080/api/shops/getById/'+globalData.getGlobalShopsId())
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();

            })
            .then((result) => {
                    console.log(result);
                    setShop(result);

                },
                (error) => {
                    console.log(error);
                }
            )
    };


    useEffect(() => {
        getShop();
    }, []);


    return (
        <div>
            <header>

                <div className="container1">
                    <Greeting></Greeting>
                    <div className="logo1" onClick={() => {
                        navigate("/greeting_page");}}>
                        <h1>Save<span>Food </span></h1>
                    </div>

                    <div className="currentDetails1">
                        <div className="header-option1" onClick={() => {
                            navigate("/");}}>
                            <span>Home <FaHome></FaHome></span>
                        </div>
                        <div className="header-option1" onClick={() => {
                            navigate("/reservations");
                        }}>
                            <i data-feather="clock"></i>
                            <span>I miei ordini <FaCalendarCheck></FaCalendarCheck></span>
                        </div>
                    </div>


                </div>


            </header>

            <div className="options1">
                <div className="container1">
                    <div className="header-title1">
                        <h2>Modifica un negozio:</h2>
                    </div>
                    <div className="header-viewOptions1">
                        <div className="viewAll1" onClick={() => {
                            navigate("/vendors/homepage");

                        }}>
                            <span><FaArrowLeft/> Torna Indietro</span>
                        </div>

                    </div>

                    <div className="listings-grid-element1">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputNome">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputNome"
                                        placeholder={shop.name}
                                        name="name"
                                        value={formData.name || shop.name} // Imposta il valore del campo a formData.name se è definito, altrimenti usa il valore di shop.name
                                        minLength="5"
                                        maxLength="50"
                                        required
                                        onChange={handleInputChange}
                                    />

                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCittà">Città</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputNome"
                                        placeholder={shop.city}
                                        name="name"
                                        value={formData.city || shop.city} // Imposta il valore del campo a formData.name se è definito, altrimenti usa il valore di shop.name
                                        minLength="5"
                                        maxLength="50"
                                        required
                                        onChange={handleInputChange}
                                    />

                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="inputAddress">Indirizzo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputNome"
                                    placeholder={shop.address}
                                    name="name"
                                    value={formData.address || shop.address} // Imposta il valore del campo a formData.name se è definito, altrimenti usa il valore di shop.name
                                    minLength="5"
                                    maxLength="50"
                                    required
                                    onChange={handleInputChange}
                                />

                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputDescription">Descrizione</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputNome"
                                    placeholder={shop.description}
                                    name="name"
                                    value={formData.description || shop.description} // Imposta il valore del campo a formData.name se è definito, altrimenti usa il valore di shop.name
                                    minLength="5"
                                    maxLength="50"
                                    required
                                    onChange={handleInputChange}
                                />

                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputtelephonNumber">Numero di telefono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputNome"
                                    placeholder={shop.telephoneNumber}
                                    name="name"
                                    value={formData.telephoneNumber || shop.telephoneNumber} // Imposta il valore del campo a formData.name se è definito, altrimenti usa il valore di shop.name
                                    minLength="5"
                                    maxLength="50"
                                    required
                                    onChange={handleInputChange}
                                />

                            </div>

                            <div className="auth-wrapper">
                                <div className="auth-inner" style={{ width: 'auto' }}>
                                    Carica un'immagine<br />
                                    <input
                                        accept="image/*"
                                        type="file"
                                        onChange={convertToByteArray}
                                        required
                                    />
                                    {imagePreview ? ( // Se c'è un'anteprima, mostrala
                                        <img width={100} height={100} src={imagePreview} alt="Preview" />
                                    ) : image ? ( // Se c'è un'immagine ma non c'è anteprima, mostra l'immagine attuale
                                        <img width={100} height={100} src={shop.image} alt="Current" />
                                    ) : null}
                                </div>
                                <br />

                                {allImage.map((data) => (
                                    <img
                                        key={data.id}
                                        width={100}
                                        height={100}
                                        src={data.image}
                                        alt="Uploaded"
                                    />
                                ))}


                            <br />
                                <button
                                    type="submit"
                                    className="btn btn-primary #198754 bg-primary border-primary"
                                >
                                    Modifica Negozio
                                </button>

                                {allImage.map((data) => (
                                    <img
                                        key={data.id}
                                        width={100}
                                        height={100}
                                        src={data.image}
                                        alt="Uploaded"
                                    />
                                ))}
                            </div>

                            {showConfirmation && (
                                <div className="confirmation-message">
                                    Il locale è stato modificato con successo
                                </div>
                            )}

                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModifyNegozio;
