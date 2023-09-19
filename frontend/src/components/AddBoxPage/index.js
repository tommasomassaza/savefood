import React, {useState} from 'react';
import boxes from "../../data/boxes.json";
import {useNavigate} from "react-router-dom";

import UploadAndDisplayImage from "./UploadAndDisplayImage.js"


function AddBoxPage() {

    const [image, setImage] = useState("");
    const [allImage, setAllImage] = useState([]);

    const box = boxes[window.id]; /*window.id è una variabile globale definita in BoxItem, usata per caricare la box dall'id corretto nella BoxPage*/

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        nome: "",
        descrizione: "",
        prezzo: "",
        taglia: "",
        orarioRitiro: "",
        città: "Città",
        base64: image,
        negozioId: "",
        // Aggiungi altri campi del form qui se necessario
    });








    let postBox = () => {
        fetch(`http://localhost:8080/api/boxes`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                console.log(res.status)
                console.log(res.headers)


            })
            .catch(error => {
                console.error({
                    error
                });
            })

    }




    function convertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };

        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }


    function uploadImage() {
        fetch('http://localhost:8080/upload-image', {
            method: "POST",
            crossDomain: true,
            haders: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                base64: image
            })
        })
            .then(res =>
                res.json()
            )
            .then((data) =>
                console.log(data))
    }

    function getImage() {
        fetch('http://localhost:8080/upload-image', {
            method: "GET",

        })
            .then((res) => res.json()).then((data) => {
            console.log(data)
            setAllImage(data.data)
        })
    }





    return (

        <body>


        <header>
            <div className="container1">
                <div className="logo1" onClick={() => {
                    navigate("/");
                    navigate(0);
                }}>
                    <h1>Save<span>Food </span></h1>
                </div>
                <div className="currentDetails1">
                    <div className="header-option1">
                        <i data-feather="map-pin"></i>
                        <span>Google Maps</span>
                    </div>
                    <div className="header-option1" onClick={() => {
                        navigate("/reservations");
                    }}>
                        <i data-feather="clock"></i>
                        <span>I miei ordini</span>
                    </div>
                </div>


                <div className="searchBar1">
                    <div className="header-option1">
                        <i data-feather="search"></i>
                        <span>Cerca</span>
                    </div>
                    <div className="header-option1" onClick={() => {
                        navigate("/login");
                    }}>
                        <span>Log in</span>
                    </div>
                </div>
            </div>
        </header>


        <div className="options1">
            <div className="container1">

                <div className="header-title1">
                    <h2>Aggiungi una box:</h2>
                </div>

                <div className="listings-grid-element1">
                    <form className="form">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputNome">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputNome"
                                    placeholder="Nome..."
                                    value={formData.nome}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputDescrizione">Descrizione</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputDescrizione"
                                    placeholder="Descrizione..."
                                    value={formData.descrizione}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                />
                            </div>

                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPrezzo">Prezzo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPrezzo"
                                placeholder="Prezzo..."
                                value={formData.prezzo}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputTaglia">Taglia</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputTaglia"
                                placeholder="Taglia..."
                                value={formData.taglia}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputOrario">Orario di ritiro</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputOrario"
                                    placeholder="Orario..."
                                    value={formData.orarioRitiro}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                />
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputNegozioId">Negozio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputNegozio"
                                    placeholder="Negozio..."
                                    value={formData.negozioId}
                                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                />
                            </div>

                        </div>








                        <div className="auth-wrapper">
                            <div className="auth-inner" style={{width: "auto"}}>
                                Carica un'immagine<br/>
                                <input

                                    accept="image/*"
                                    type="file"
                                    onChange={convertToBase64}

                                />
                                {image === "" || image === null ? "" : <img width={100} height={100} src={image}/>}

                            </div>
                            <br></br>
                            <button type="submit" className="btn btn-primary #198754 bg-primary border-primary" onClick={postBox()}> Aggiungi box  </button>

                            {allImage.map(data => {

                                return (
                                    <img width={100} height={100} src={data.image}/>
                                )

                            })}


                        </div>




                        <br></br>
                        


                    </form>

                </div>


            </div>
        </div>
        </body>


    );
}

export default AddBoxPage;