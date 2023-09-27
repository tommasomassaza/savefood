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

function ModifyBox() {
    const [image, setImage] = useState("");
    const [imageVisualize, setImageVisualize] = useState("");
    const [allImage, setAllImage] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [box, setBox] = useState([]);
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
        boxId: globalDataBox.getGlobalBoxId(),
        shopId: globalData.getGlobalShopsId(), //da passare
        name: "",
        description: "",
        price: "",
        size: "",
        pickUpTime: "",
        city: globalCityShop.getGlobalCityShop(), //da passare
        quantity: "",
        image: image,
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
        formDataToSend.append("boxId", formData.boxId);
        formDataToSend.append('shopId', formData.shopId);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('size', formData.size);
        formDataToSend.append('pickUpTime', formData.pickUpTime);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('quantity', formData.quantity);
        formDataToSend.append('image', new Blob([image], { type: 'image/jpeg' })); // Usa 'image/jpeg' o il tipo di immagine corretto

        // Verifica se è stata selezionata una nuova immagine
        if (image !== box.image) {
            formDataToSend.append("image", new Blob([image], { type: "image/jpeg" }));
        }

        // Invia formDataToSend al tuo backend
        fetch("http://localhost:8080/api/boxes", {
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


    let getBox = () => {
        fetch('http://localhost:8080/api/boxes/getById/' + globalDataBox.getGlobalBoxId())
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();
            })
            .then((result) => {
                    console.log(result);
                    setBox(result);
                    // Aggiorna i campi del form con i dati della box
                    setFormData({
                        ...formData,
                        name: result.name || "",
                        description: result.description || "",
                        price: result.price || "",
                        size: result.size || "",
                        pickUpTime: result.pickUpTime || "",
                        city: result.city || "",
                        quantity: result.quantity || "",
                    });
                    // Aggiorna l'anteprima dell'immagine se c'è una immagine nella box

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
        getBox();

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
                        <h2>Modifica la box:</h2>
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
                                        placeholder={box.name}
                                        name="name"
                                        value={formData.name}
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
                                        id="inputDescription"
                                        placeholder={box.description}
                                        name="description"
                                        value={formData.description}
                                        minLength="20"
                                        maxLength="300"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="inputPrezzo">Prezzo</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="inputPrezzo"
                                    placeholder="Prezzo..."
                                    name="price"
                                    value={box.price}
                                    min="1.00"
                                    max="50"
                                    step="0.5"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputTaglia">Taglia</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="inputTaglia"
                                    placeholder={box.size}
                                    name="size"
                                    value={formData.size}
                                    min="1"
                                    max="3"
                                    step="1"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputOrario">Orario di ritiro</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="inputOrario"
                                    placeholder={box.pickUpTime}
                                    name="pickUpTime"
                                    value={formData.pickUpTime}
                                    min="11:00"
                                    max="03:00"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputQuantity">Quantity</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputQuantity"
                                    placeholder={box.quantity}
                                    name="quantity"
                                    value={formData.quantity}
                                    maxLength="2"
                                    min="1"
                                    max="10"
                                    step="1"
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
                                    Modifica Box
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
                                    La box è stata modificata con successo
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
