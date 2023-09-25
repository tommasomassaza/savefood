import React, { useState, useEffect } from 'react';
import boxes from "../../data/boxes.json";
import { useNavigate } from "react-router-dom";
import { globalData, globalCityShop, globalDataBox } from "../GreetingPage/global";
import Greeting from "../Greeting";
import { FaArrowLeft, FaCalendarCheck, FaHome } from "react-icons/fa";
import {useUser} from "@clerk/clerk-react";

function ModifyBox() {
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
            navigate('/vendors/homepage2');
        }, 1500); // Il messaggio scomparirà dopo 4 secondi (4000 millisecondi)
    };

    const navigate = useNavigate();

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
        telephonNumber: '', // Corretto il nome del campo 'telephonNumber'
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
        formDataToSend.append('sellerId', formData.sellerId);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('telephonNumber', formData.telephonNumber);
        formDataToSend.append('image', new Blob([image], { type: 'image/jpeg' })); // Usa 'image/jpeg' o il tipo di immagine corretto

        // Invia formDataToSend al tuo backend
        fetch('http://localhost:8080/api/shops/'+globalData.getGlobalShopsId(), {
            method: 'PUT',
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
                        telephonNumber: result.telephonNumber || "",
                    });
                    // Aggiorna l'anteprima dell'immagine se c'è una immagine nella box
                    if (result.image) {
                        setImageVisualize(result.image);
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
                        <h2>Modifica il negozio:</h2>
                        <div className="header-viewOptions1">
                            <div className="viewAll1" onClick={() => {
                                navigate("/vendors/homepage2");

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
                                        minLength="5"
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
                                        minLength="20"
                                        maxLength="300"
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
                                    min="1.00"
                                    max="50"
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
                                    min="1"
                                    max="3"
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
                                    value={formData.telephoneNumber}
                                    min="10"
                                    max="10"
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

export default ModifyBox;
