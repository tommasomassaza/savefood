import React, {useState} from 'react';
import boxes from "../../data/boxes.json";
import {useNavigate} from "react-router-dom";
import { globalData } from "../GreetingPage/global";

import UploadAndDisplayImage from "./UploadAndDisplayImage.js"


function AddBoxPage() {

    const [image, setImage] = useState("");
    const [allImage, setAllImage] = useState([]);

    const box = boxes[window.id]; /*window.id è una variabile globale definita in BoxItem, usata per caricare la box dall'id corretto nella BoxPage*/

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        shopId: globalData.globalShopsId, //da passare
        name: "",
        description: "",
        price: "",
        size: "",
        pickUpTime: "",
        city: "", //da passare
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
            })
            .catch((error) => {
                console.error({
                    error,
                });
            });
    };





    return (
        <div>
            <header>
                {/* ... Il resto del tuo codice di intestazione */}
            </header>

            <div className="options1">
                <div className="container1">
                    <div className="header-title1">
                        <h2>Aggiungi una box:</h2>
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
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="inputPrezzo">Prezzo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputPrezzo"
                                    placeholder="Prezzo..."
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputTaglia">Taglia</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputTaglia"
                                    placeholder="inputTaglia..."
                                    name="size"
                                    value={formData.size}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputOrario">Orario di ritiro</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputOrario"
                                    placeholder="Orario di ritiro..."
                                    name="pickUpTime"
                                    value={formData.pickUpTime}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">Città</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputCity"
                                    placeholder="Città..."
                                    name="city"
                                    value={formData.city}
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
                                    {image === '' || image === null ? '' : (
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

                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBoxPage;