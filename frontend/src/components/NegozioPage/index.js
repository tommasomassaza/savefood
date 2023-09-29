import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boxes from '../../data/boxes.json';
import { useUser } from "@clerk/clerk-react";
import { FaArrowLeft, FaCalendarCheck, FaHome, FaSearch } from "react-icons/fa";
import Greeting from "../Greeting";
import Autosuggest from 'react-autosuggest';


function NegozioPage() {
    const { user } = useUser();
    const [image, setImage] = useState('');
    const [allImage, setAllImage] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [cityValue, setCityValue] = useState('');


    let userId = null; // Inizializza userId come null

    if (user) {
        userId = user.id; // Assegna il valore solo se user è definito
        console.log(userId);
    }

    const [formData, setFormData] = useState({
        sellerId: userId, // Utilizza userId qui
        name: '',
        city: '',
        address: '',
        description: '', // Corretto il nome del campo 'description'
        telephoneNumber: '', // Corretto il nome del campo 'telephoneNumber'
        image: image
    });

    const [dirtyFields, setDirtyFields] = useState({
        name: false,
        city: false,
        address: false,
        description: false,
        telephoneNumber: false
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

        // Imposta il campo come "dirty" quando l'utente inizia a scrivere
        setDirtyFields({
            ...dirtyFields,
            [name]: true,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Crea un nuovo oggetto formData solo con i dati necessari
        const formDataToSend = new FormData();
        formDataToSend.append('sellerId', formData.sellerId);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('telephoneNumber', formData.telephoneNumber);
        formDataToSend.append('image', new Blob([image], { type: 'image/jpeg' })); // Usa 'image/jpeg' o il tipo di immagine corretto

        // Invia formDataToSend al tuo backend
        fetch('http://localhost:8080/api/shops', {
            method: 'POST',
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
                        <h2>Aggiungi un negozio:</h2>
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
                                        placeholder="Nome..."
                                        name="name" // Assicurati che il nome del campo corrisponda a formData.name
                                        value={formData.name}
                                        minLength="3"
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
                                        id="inputCittà"
                                        placeholder="Città..."
                                        name="city" // Assicurati che il nome del campo corrisponda a formData.city
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
                                    placeholder="Indirizzo..."
                                    name="address"
                                    value={formData.address}
                                    minLength="5"
                                    maxLength="60"
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
                                    placeholder="Descrizione..."
                                    name="description"
                                    value={formData.description}
                                    minLength="20"
                                    maxLength="300"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputtelephoneNumber">Numero di telefono</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="inputtelephoneNumber"
                                    placeholder="Numero di telefono..."
                                    name="telephoneNumber"
                                    value={formData.telephoneNumber}
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
                                    {imagePreview && (
                                        <img width={100} height={100} src={imagePreview} alt="Preview" />
                                    )}
                                </div>
                                <br />
                                <button
                                    type="submit"
                                    className="btn btn-primary #198754 bg-primary border-primary"
                                >
                                    Aggiungi Negozio
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
                                    Il locale è stato aggiunto con successo
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

export default NegozioPage;
