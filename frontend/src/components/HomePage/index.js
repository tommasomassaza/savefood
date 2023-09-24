import BoxItem from '../BoxItem/index.js';
import {useNavigate} from "react-router-dom";
import {FaCalendarCheck, FaHome, FaSearch} from "react-icons/fa";
import './slider.js';
import './selection.js';
import Greeting from "../Greeting";
import Sidebar from "./sidebar";
import boxes from "../../data/boxes.json"


import React, {useEffect, useState} from "react";
import './HomePage.scss';
import {UserButton, useUser} from "@clerk/clerk-react";

function HomePage() {


    const w3_close = () => {
        document.getElementById("mySidebar").style.display = "none";
    }

    const w3_open = () => {
        document.getElementById("mySidebar").style.display = "block";
    }

    //per navigare tra i link
    const navigate = useNavigate();


    function buttonColor() {
        document.getElementById("options-btn1").style.backgroundColor = '#911';
    }


    //console.log(posts)
    const [boxes, setBoxes] = useState([]);

    const {user} = useUser();
    let getBoxes = () => {
        fetch('http://localhost:8080/api/boxes')
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();

            })
            .then((result) => {
                    console.log(result);
                    setBoxes(result);
                    setAllProducts(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    };


    useEffect(() => {
        getBoxes();
    }, []);


    //barra di ricerca, non ancora implementata
    const [searchTerm, setSearchTerm] = useState("");


    //gestione dei filtri
    const [category, setCategory] = useState("Oggi");
    const [allProducts, setAllProducts] = useState([]);


    useEffect(() => {
        if (category === "Tutti") {
            setAllProducts(boxes);
        }

        if (category === "Searched") {
            console.log(category);
            if (searchTerm === "") {
                setAllProducts(boxes);
            } else {
                const filteredProducts = boxes.filter(
                    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setAllProducts(filteredProducts);
            }

        }

    }, [category, searchTerm]);

    if (user) {
        const userId = user.id;
        console.log(userId); // Pu
    }


    return (


        <body>


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


                <div className="searchBar1">
                    <div className="header-option1">
                        <FaSearch></FaSearch>
                        <input className="searchQueryInput" type="text" placeholder="Cerca..." onChange={event => {
                            setSearchTerm(event.target.value);
                            setCategory("Searched");
                        }}/>
                    </div>


                    


                    <div className="header-option1">

                        
        
         <UserButton show={true} />
    
     
                    </div>







                </div>

            </div>


        </header>


        <div className="options1">
            <Sidebar className="barra"></Sidebar>

            <div className="container1">


                <button className="options-btn1 selected1 uno">
                    <i data-feather="shopping-bag"></i>
                    <span>Disponibili oggi</span>
                </button>
                <button className="options-btn1 due" onClick={() => {
                    navigate("/2")
                }}>
                    <i data-feather="watch"></i>
                    <span>In offerta</span>
                </button>
                <button className="options-btn1 tre" onClick={() => {
                    navigate("/3");
                }}>
                    <i data-feather="watch"></i>
                    <span>Più vendute</span>
                </button>
                <div className="searchBar2">
                    <FaSearch></FaSearch>
                    <input className="searchQueryInput2" type="text" placeholder="Cerca Box..." onChange={event => {
                        setSearchTerm(event.target.value);
                        setCategory("Searched");
                    }}/>


                </div>

            </div>

        </div>


        <div className="listings1">
            <div className="container1">
                <div className="header1">
                    <div className="header-title1">
                        <h2>Disponibili oggi</h2>
                        <span>Box in scadenza</span>
                    </div>
                    <div className="header-viewOptions1">

                    </div>
                </div>

                <div className="listings-grid1">
                    <div className="listings-col1" style={{maxHeight: 700, overflow: 'scroll'}}>
                        {allProducts.map(item => (
                            <BoxItem box={item}></BoxItem>

                        ))}
                    </div>
                </div>
            </div>

        </div>

        </body>


    );
}

export default HomePage;
