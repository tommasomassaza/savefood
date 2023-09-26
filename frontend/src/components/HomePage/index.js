import BoxItem from '../BoxItem/index.js';
import {useNavigate} from "react-router-dom";
import {FaCalendarCheck, FaHome, FaSearch} from "react-icons/fa";
import './slider.js';
import './selection.js';
import Greeting from "../Greeting";
import Sidebar from "./sidebar";
import Coordinates from "../Google Maps/coordinates.js"


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

                },
                (error) => {
                    console.log(error);
                }
            )
    };


    useEffect(() => {
        getBoxes();
        <Coordinates/>
        }, []);


    //barra di ricerca, non ancora implementata
    const [searchTerm, setSearchTerm] = useState("");


    //gestione dei filtri
    const [category, setCategory] = useState("Tutti");
    const [allProducts, setAllProducts] = useState([]);


    useEffect(() => {
        if (category === "Tutti") {
            setAllProducts(boxes);
        } else if (category === "Piccole") {
            const filteredProducts = boxes.filter(item => item.size === 1);
            setAllProducts(filteredProducts);
        } else if (category === "Medie") {
            const filteredProducts = boxes.filter(item => item.size === 2);
            setAllProducts(filteredProducts);
        } else if (category === "Grandi") {
            const filteredProducts = boxes.filter(item => item.size === 3);
            setAllProducts(filteredProducts);
        } else if (category === "Mattina" || category === "Pomeriggio" || category === "Sera") {
            const filteredProducts = boxes.filter(item => {
                const timeParts = item.pickUpTime.split(":");
                const hour = parseInt(timeParts[0]);

                if (category === "Mattina" && hour >= 0 && hour < 12) {
                    return true;
                } else if (category === "Pomeriggio" && hour >= 12 && hour < 18) {
                    return true;
                } else if (category === "Sera" && hour >= 18 && hour <= 23) {
                    return true;
                }

                return false;
            });
            setAllProducts(filteredProducts);
        } else if (category === "Searched") {
            if (searchTerm === "") {
                setAllProducts(boxes);
            } else {
                const filteredProducts = boxes.filter(
                    item => item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setAllProducts(filteredProducts);
            }
        }
    }, [category, searchTerm, boxes]);


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


                <button className="options-btn1 selected1 uno" onClick={() => {
                    navigate("/");
                }}>
                    <i data-feather="shopping-bag"></i>
                    <span>Tutte</span>
                </button>
                <button className="options-btn1 due" onClick={() => {
                    navigate("/2");
                }}>
                    <i data-feather="watch"></i>
                    <span>Piccole</span>
                </button>
                <button className="options-btn1 tre"onClick={() => {
                    navigate("/3");
                }}>
                    <i data-feather="watch"></i>
                    <span>Medie</span>
                </button>
                <button className="options-btn1 quattro"onClick={() => {
                    navigate("/4");
                }}>
                    <i data-feather="watch"></i>
                    <span>Grandi</span>
                </button>
                <button className="options-btn1 cinque"onClick={() => {
                    navigate("/5");
                }}>
                    <i data-feather="watch"></i>
                    <span>Mattina</span>
                </button>
                <button className="options-btn1 sei"onClick={() => {
                    navigate("/6");
                }}>
                    <i data-feather="watch"></i>
                    <span>Pomeriggio</span>
                </button>
                <button className="options-btn1 sette"onClick={() => {
                    navigate("/7");
                }}>
                    <i data-feather="watch"></i>
                    <span>Sera</span>
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
                        <h2>Tutte</h2>
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
