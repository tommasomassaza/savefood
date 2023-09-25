import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {FaPen, FaTrashAlt} from "react-icons/fa";
import {
    globalDataBox,
    globalBoxName,
    globalBoxPrice,
    globalBoxPickUpTime,
    globalBoxShopId,
    globalData
} from "../GreetingPage/global";

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


const BoxItem = ({box}) => {

    const [grandezzaStringa, setGrandezzaStringa] = useState(null); // Stringa di grandezza della box

    const setIdNew = (boxId, boxname, boxprice, boxpickuptime, boxshopId) => {
        globalDataBox.setGlobalBoxId(boxId);
        globalBoxName.setGlobalName(boxname);
        globalBoxPrice.setGlobalPrice(boxprice);
        globalBoxPickUpTime.setGlobalPickUpTime(boxpickuptime);
        globalBoxShopId.setGlobalBoxShopId(boxshopId);
        console.log("eccola la box: " + globalBoxName.getGlobalName());
    };

    const setBoxSize = (size) => {
        if(size === 1)
        {
            setGrandezzaStringa("Piccola")
        }
        if(size === 2)
        {
            setGrandezzaStringa("Media")
        }
        if(size === 3)
        {
            setGrandezzaStringa("Grande")
        }
    };


    const [imageBlob, setImageBlob] = useState(null); // Stato per l'immagine Blob

    /*
    const setIdNew = () => {
        window.id = box.id - 1
    };*/


    const navigate = useNavigate();


    const deleteBox = boxId => {
        fetch(`http://localhost:8080/api/boxes/${boxId}`, {
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


        //history.push("/");
    };

    // Effettua la conversione dell'immagine quando il componente viene montato
    useEffect(() => {
        if (box.image) {
            const blob = base64ToBlob(box.image, "image/jpeg"); // Cambia il tipo MIME in base al tuo tipo di immagine
            setImageBlob(URL.createObjectURL(blob));
        }
        setBoxSize(box.size)
    }, [box.image]);


    return (

        <div className="listings-grid-element1">
            <div className="image1" onClick={() => { setIdNew(box.boxId,box.name,box.price,box.pickUpTime,box.shopId); navigate("/box");}}>
                {/* Utilizza l'URL dell'immagine Blob */}
                {imageBlob && <img src={imageBlob} alt="prova" />}
            </div>
            <div className="text1">
                <div className="text-title1">
                    <h3>{box.name}</h3>


                    <div className="info1">
                        <span><strong className="bold-text">Prezzo:</strong> {box.price} € | <strong className="bold-text">Grandezza:</strong> {grandezzaStringa} | <strong className="bold-text">Orario di ritiro:</strong> {box.pickUpTime} |</span>
                    </div>
                </div>
                <div className="rating2">
                    <span className="circle1">{box.quantity}</span>
                </div>
            </div>
            <div className="text-lower1">
                <span className="smallText1">Descrizione: {box.description} </span>
            </div>
        </div>


    );
};

export default BoxItem;