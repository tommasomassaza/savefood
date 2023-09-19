import React from "react"
import {useNavigate} from "react-router-dom";
import {useState} from "react";


import {FaArrowLeft, FaPen, FaTrashAlt, FaPlusCircle, FaUserAlt} from "react-icons/fa";

window.id = 0;

const ShoptItemOwner = ({shop}) => {


    const setIdNew = () => {
        window.id = shop.id - 1
    };


    const navigate = useNavigate();


    const deleteshop = shopId => {
        fetch(`http://localhost:8080/api/shopes/${shopId}`, {
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


    return (

        <div className="listings-grid-element1">
            <div className="image1" onClick={() => {
                navigate("/vendors/homepage2");
            }}>
                <img src={shop.image} alt="prova"/>
            </div>
            <div className="text1">
                <div className="text-title1">
                    <h3>{shop.name}</h3>

                    <FaTrashAlt className="icons1" color="red" margin-left="2rem" onClick={() => deleteshop(shop.shopId)}/>

                    <FaPen color="#034694"/>


                    <div className="info1">
                        <span>Indirizzo: {shop.address}  | Descrizione: {shop.description} | </span>
                    </div>
                </div>
                <div className="rating2">
                    <span className="circle1">4.2</span>
                </div>
            </div>
            <div className="text-lower1">
                <span className="smallText1">Info1 | Info2 | Info3 | Info4 | Info5 </span>
            </div>
        </div>


    );
};

export default ShoptItemOwner;