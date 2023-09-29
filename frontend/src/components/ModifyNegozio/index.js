import React, { useState, useEffect } from 'react';
import boxes from "../../data/boxes.json";
import { useNavigate } from "react-router-dom";
import { globalData, globalCityShop, globalDataBox } from "../GreetingPage/global";
import Greeting from "../Greeting";
import { FaArrowLeft, FaCalendarCheck, FaHome } from "react-icons/fa";
import {useUser} from "@clerk/clerk-react";


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

function ModifyNegozio() {
    const [image, setImage] = useState("");
    const [imageVisualize, setImageVisualize] = useState("");
    const [allImage, setAllImage] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [shop, setShop] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const { user } = useUser();

    const handleConfirmation = () => {
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            navigate('/vendors/homepage');
        }, 1500); // Il messaggio scomparirà dopo 4 secondi (4000 millisecondi)
    };

    const navigate = useNavigate();

    let userId = null; // Inizializza userId come null

    if (user) {
        userId = user.id; // Assegna il valore solo se user è definito
        console.log(userId);
    }

    const [formData, setFormData] = useState({
        shopId: globalData.getGlobalShopsId(),
        sellerId: userId, // Utilizza userId qui
        name: '',
        city: '',
        address: '',
        description: '', // Corretto il nome del campo 'description'
        telephoneNumber: '', // Corretto il nome del campo 'telephoneNumber'
        image: image
        // Aggiungi altri campi del form qui se necessario
    });

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
        formDataToSend.append("shopId", formData.shopId);
        formDataToSend.append("sellerId", formData.sellerId);
        formDataToSend.append("name", formData.name);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("telephoneNumber", formData.telephoneNumber);

        // Verifica se è stata selezionata una nuova immagine
        if (image !== shop.image) {
            formDataToSend.append("image", new Blob([image], { type: "image/jpeg" }));
        }

        // Invia formDataToSend al tuo backend
        fetch("http://localhost:8080/api/shops", {
            method: "PUT",
            body: formDataToSend,
        })
            .then((res) => {
                console.log(res.status);
                console.log(res.headers);
                setIsSubmitted(true);
            })
            .catch((error) => {
                console.error({
                    error,
                });
            });
        handleConfirmation();
    };


    let getShop = () => {
        fetch('http://localhost:8080/api/shops/getById/' + globalData.getGlobalShopsId())
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();
            })
            .then((result) => {
                    console.log(result);
                    setShop(result);
                    // Aggiorna i campi del form con i dati della box
                    setFormData({
                        ...formData,
                        name: result.name || "",
                        city: result.city || "",
                        address: result.address || "",
                        description: result.description || "",
                        telephoneNumber: result.telephoneNumber || "",
                    });
                    // Aggiorna l'anteprima dell'immagine se c'è una immagine nello shop

                    if (result.image) {
                        const blob = base64ToBlob(result.image, "image/jpeg"); // Cambia il tipo MIME in base al tuo tipo di immagine
                        setImageVisualize(URL.createObjectURL(blob));
                    }
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
                        navigate("/");}}>
                        <h1>Save<span>Food </span></h1>
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


                </div>


            </header>

            <div className="options1">
                <div className="container1">
                    <div className="header-title1">
                        <h2>Modifica il negozio:</h2>
                        <div className="header-viewOptions1">
                            <div className="viewAll1" onClick={() => {
                                navigate("/vendors/homepage");

                            }}>
                                <span><FaArrowLeft/> Torna Indietro</span>
                            </div>

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
                                        value={formData.name}
                                        minLength="3"
                                        maxLength="50"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">Città</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputCity"
                                        placeholder={shop.city}
                                        name="city"
                                        value={formData.city}
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
                                    id="inputAddress"
                                    placeholder={shop.address}
                                    name="address"
                                    value={formData.address}
                                    minLength="5"
                                    maxLength="60"
                                    step="0.5"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputDescription">Descrizione</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputDescription"
                                    placeholder={shop.description}
                                    name="description"
                                    value={formData.description}
                                    minLength="20"
                                    maxLength="300"
                                    step="1"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputTelephoneNumber">Numero di telefono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputTelephoneNumber"
                                    placeholder={shop.telephoneNumber}
                                    name="telephoneNumber"
                                    value={formData.telephoneNumber} // Imposta il valore corretto del campo
                                    pattern="[0-9]{10}"
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
                                    ) : imageVisualize ? ( // Mostra l'immagine esistente, se disponibile
                                        <img width={100} height={100} src={imageVisualize} alt="Existing" />
                                    ) : null}
                                </div>
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
                                    Il negozio è stata modificato con successo
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
