import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrashAlt } from "react-icons/fa";

import { globalData,globalCityShop } from "../GreetingPage/global";

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



const ShoptItemOwner = ({ shop }) => {
    const [imageBlob, setImageBlob] = useState(null); // Stato per l'immagine Blob
    const navigate = useNavigate();

    const setIdNew = (shopId, city) => {
        globalData.globalShopsId = shopId; // Utilizza la funzione di impostazione
        globalCityShop.globalCityShop = city;
        console.log("eccolooooo: " + globalData.globalShopsId)
        console.log("è la cittadine: " + city)
        console.log("è la cite: " + globalCityShop.globalCityShop)
    };

    const deleteshop = (shopId) => {
        fetch('http://localhost:8080/api/shops/'+shopId, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
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

    // Effettua la conversione dell'immagine quando il componente viene montato
    useEffect(() => {
        if (shop.image) {
            const blob = base64ToBlob(shop.image, "image/jpeg"); // Cambia il tipo MIME in base al tuo tipo di immagine
            setImageBlob(URL.createObjectURL(blob));
        }
    }, [shop.image]);

    return (
        <div className="listings-grid-element1">
            <div className="image1" onClick={() => { setIdNew(shop.shopId, shop.city); navigate("/vendors/homepage2"); navigate(0);}}>
                {/* Utilizza l'URL dell'immagine Blob */}
                {imageBlob && <img src={imageBlob} alt="prova" />}
            </div>
            <div className="text1">
                <div className="text-title1">
                    <h3>{shop.name}</h3>
                    <FaTrashAlt
                        className="icons1"
                        color="red"
                        margin-left="2rem"
                        onClick={() => deleteshop(shop.shopId)}
                    />
                    <FaPen color="#034694" />
                    <div className="info1">
            <span>
              Città: {shop.city} | Indirizzo: {shop.address} | Telefono: {shop.telephoneNumber}
            </span>
                    </div>
                </div>
                <div className="rating2">
                    <span className="circle1">{shop.stars}</span>
                </div>
            </div>
            <div className="text-lower1">
                <span className="smallText1">| Descrizione: {shop.description} |</span>
            </div>
        </div>
    );
};

export default ShoptItemOwner;
