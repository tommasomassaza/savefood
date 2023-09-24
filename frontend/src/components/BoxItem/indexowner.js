import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";



import {FaPen, FaTrashAlt} from "react-icons/fa";

window.id = 0;


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

const BoxItemOwner = ({box}) => {

    const [imageBlob, setImageBlob] = useState(null); // Stato per l'immagine Blob

    const setIdNew = () => {
        window.id = box.id - 1
    };


    const navigate = useNavigate();


    const deleteBox = boxId => {
        fetch('http://localhost:8080/api/boxes/'+box.boxId, {
            method: "DELETE",
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
            });


       navigate("/vendors/homepage2");
    };

    // Effettua la conversione dell'immagine quando il componente viene montato
    useEffect(() => {
        if (box.image) {
            const blob = base64ToBlob(box.image, "image/jpeg"); // Cambia il tipo MIME in base al tuo tipo di immagine
            setImageBlob(URL.createObjectURL(blob));
        }
    }, [box.image]);


    return (

        <div className="listings-grid-element1">
            <div className="image1" onClick={() => { navigate("/vendors/box");}}>
                {/* Utilizza l'URL dell'immagine Blob */}
                {imageBlob && <img src={imageBlob} alt="prova" />}
            </div>
            <div className="text1">
                <div className="text-title1">
                    <h3>{box.name}</h3>

                    <FaTrashAlt className="icons1" color="red" margin-left="2rem" onClick={() => deleteBox(box.boxId)}/>

                    <FaPen color="#034694"/>


                    <div className="info1">
                        <span><strong className="bold-text">Prezzo:</strong> {box.price} € | <strong className="bold-text">Grandezza:</strong> {box.size} | <strong className="bold-text">Orario di ritiro:</strong> {box.pickUpTime} |</span>
                    </div>
                </div>
                <div className="rating2">
                    <span className="circle1">4.2</span>
                </div>
            </div>
            <div className="text-lower1">
                <span className="smallText1">Descrizione: {box.description} </span>
            </div>
        </div>


    );
};

export default BoxItemOwner;