import React, {useEffect, useState} from "react";

const UploadAndDisplayImage = () => {


    let postNegozio = () => {
        fetch(`http://localhost:8080/api/shops`, {
            method: "POST",
            body: JSON.stringify({
                 "name": "Nome Negozio 1",
                 "addess": "jskjsk",
                 "description": "asdasas",
                 "telephoneNumber": 3389842823,
                 "numberOfReviews": 0,
                 "stars": 0
            }),
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

    };



    const [image, setImage] = useState("");
    const [allImage, setAllImage] = useState([]);


    /*
    useEffect(()=>{
        getImage()
    },[]
    )*/


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
            <button type="submit" class="btn btn-primary #198754 bg-primary border-primary"onClick={() => {/*uploadImage();*/ postNegozio()}}>Aggiungi
                            negozio
                        </button>

            {allImage.map(data => {

                return (
                    <img width={100} height={100} src={data.image}/>
                )

            })}


        </div>
    );
};

export default UploadAndDisplayImage;