import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import boxes from '../../data/boxes.json';
import {useUser} from "@clerk/clerk-react";
import {FaCalendarCheck, FaHome, FaSearch} from "react-icons/fa";
import Greeting from "../Greeting";

function NegozioPage() {
    const { user } = useUser();
    const [image, setImage] = useState('');
    const [allImage, setAllImage] = useState([]);

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

        //navigate('/vendors/homepage');
        //navigate(0);
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
                        <h2>Aggiungi un negozio:</h2>
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
                                        minlength="5"
                                        maxlength="50"
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
                                        name="city"
                                        value={formData.city}
                                        maxlength="20"
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
                                    minlength="5"
                                    maxlength="60"
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
                                    minlength="20"
                                    maxlength="300"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputtelephonNumber">Numero di telefono</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="inputtelephonNumber"
                                    placeholder="Numero di telefono..."
                                    name="telephonNumber"
                                    value={formData.telephonNumber}
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
                                    {image === '' || image === null ? '' : (
                                        <img width={100} height={100} src={image} alt="Uploaded" />
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

                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NegozioPage;
