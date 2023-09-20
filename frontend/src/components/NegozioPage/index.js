import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boxes from '../../data/boxes.json';
import { useUser } from "@clerk/clerk-react";

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

    const postShop = () => {
        fetch('http://localhost:8080/api/shops', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'content-type': 'application/json',
            },
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

    const uploadImage = () => {
        fetch('http://localhost:8080/upload-image', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                base64: image,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };

    const getImage = () => {
        fetch('http://localhost:8080/upload-image', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAllImage(data.data);
            });
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

        // Rimuovi l'invio dell'immagine come stringa Base64 da formData
        const { image, ...formDataWithoutImage } = formData;

        // Crea un nuovo oggetto formData solo con i dati necessari
        const formDataToSend = new FormData();
        formDataToSend.append('sellerId', formDataWithoutImage.sellerId);
        formDataToSend.append('name', formDataWithoutImage.name);
        formDataToSend.append('city', formDataWithoutImage.city);
        formDataToSend.append('address', formDataWithoutImage.address);
        formDataToSend.append('description', formDataWithoutImage.description);
        formDataToSend.append('telephonNumber', formDataWithoutImage.telephonNumber);
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
    };


    return (
        <div>
            <header>

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
                            <div className="form-group col-md-6">
                                <label htmlFor="inputtelephonNumber">Numero di telefono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputtelephonNumber"
                                    placeholder="Numero di telefono..."
                                    name="telephonNumber"
                                    value={formData.telephonNumber}
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
