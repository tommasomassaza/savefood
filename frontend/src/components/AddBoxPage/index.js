import React, {useState,useEffect} from 'react';
import boxes from "../../data/boxes.json";
import {useNavigate} from "react-router-dom";
import { globalData,globalCityShop } from "../GreetingPage/global";
import Greeting from "../Greeting";
import {FaArrowLeft, FaCalendarCheck, FaHome, FaSearch} from "react-icons/fa";




function AddBoxPage() {

    const [image, setImage] = useState("");
    const [imageVisualize, setImageVisualize] = useState("");
    const [allImage, setAllImage] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleConfirmation = () => {
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 2000); // Il messaggio scomparirà dopo 4 secondi (4000 millisecondi)
    };


    const box = boxes[window.id]; /*window.id è una variabile globale definita in BoxItem, usata per caricare la box dall'id corretto nella BoxPage*/

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        shopId: globalData.globalShopsId, //da passare
        name: "",
        description: "",
        price: "",
        size: "",
        pickUpTime: "",
        city: globalCityShop.globalCityShop, //da passare
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
        };

        reader.readAsArrayBuffer(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log("l'id in addbox:"+globalData.globalShopsId);
        console.log("l'id in form:"+formData.shopId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Crea un nuovo oggetto formData solo con i dati necessari
        const formDataToSend = new FormData();
        formDataToSend.append('shopId', formData.shopId);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('size', formData.size);
        formDataToSend.append('pickUpTime', formData.pickUpTime);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('quantity', formData.quantity);
        formDataToSend.append('image', new Blob([image], { type: 'image/jpeg' })); // Usa 'image/jpeg' o il tipo di immagine corretto

        // Invia formDataToSend al tuo backend
        fetch('http://localhost:8080/api/boxes', {
            method: 'POST',
            body: formDataToSend,
        })
            .then((res) => {
                console.log(res.status);
                console.log(res.headers);
                setIsSubmitted(true); // Imposta il valore su true dopo il successo dell'invio
            })
            .catch((error) => {
                console.error({
                    error,
                });
            });
        handleConfirmation(); // Chiamiamo handleConfirmation dopo aver eseguito l'azione desiderata
    };


    function convertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImageVisualize(reader.result);
        };

        reader.onerror = error => {
            console.log("Error: ", error);
        };
    };





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
                        <h2>Aggiungi una box:</h2>
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
                                        placeholder="Nome..."
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
                                        placeholder="Descrizione..."
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
                                    value={formData.price}
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
                                    placeholder="inputTaglia..."
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
                                    placeholder="Orario di ritiro..."
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
                                    placeholder="Quantity..."
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
                                        required
                                    />
                                    {imageVisualize === '' || imageVisualize === null ? '' : (
                                        <img width={100} height={100} src={image} alt="Uploaded" />
                                    )}
                                </div>
                                <br />
                                <button
                                    type="submit"
                                    className="btn btn-primary #198754 bg-primary border-primary"
                                >
                                    Aggiungi Box
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
                                    La box è stata aggiunta con successo
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

export default AddBoxPage;
