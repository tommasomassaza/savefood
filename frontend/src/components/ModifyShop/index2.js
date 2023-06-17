import boxes from "../../data/boxes.json";
import BoxItemOwner from '../BoxItem/indexowner.js';
import {useNavigate} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
import {
    FaAlignJustify,
    FaPlusCircle,
    FaSearch,
    FaMapMarkerAlt,
    FaCalendarCheck,
    FaUserAlt,
    FaArrowUp,
    FaArrowDown
} from "react-icons/fa";


import Greeting from "../Greeting";


import React, {useState, useEffect} from "react";
import '../HomePage/HomePage.scss';
import {UserButton} from "@clerk/clerk-react";


function ModifyShop2() {


    //per navigare tra i link
    const navigate = useNavigate();


    function buttonColor() {
        document.getElementById("options-btn1").style.backgroundColor = '#911';
    }


    //console.log(posts)
    const [bociaoxes, setBoxes] = useState([]);

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
    }, []);


    //barra di ricerca, non ancora implementata
    const [searchTerm, setSearchTerm] = useState("");


    //gestione dei filtri
    const [category, setCategory] = useState("Oggi");
    const [allProducts, setAllProducts] = useState(boxes);


    useEffect(() => {
        if (category === "Tutti") {
            setAllProducts(boxes);
        }

        if (category === "Piccole") {
            const filteredProducts = boxes.filter(
                (item) => item.size === "piccolo"
            );
            setAllProducts(filteredProducts);
        }

        if (category === "Pranzo") {
            const filteredProducts = boxes.filter(
                (item) => item.size === "piccolo"
            );
            setAllProducts(filteredProducts);
        }

        if (category === "Cena") {
            const filteredProducts = boxes.filter(
                (item) => item.size === "piccolo"
            );
            setAllProducts(filteredProducts);
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


    return (


        <body>


        <header>

            <div className="container1">

                <div className="logo1">
                    <h1>Save<span>Food </span></h1>
                </div>

                <div className="currentDetails1">
                    <div className="header-option1">
                        <i data-feather="map-pin"></i>
                        <span>Google Maps <FaMapMarkerAlt></FaMapMarkerAlt></span>
                    </div>
                    <div className="header-option1" onClick={() => {
                        navigate("/ordini");
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
                        <UserButton></UserButton>
                    </div>
                </div>

            </div>


        </header>


        <div className="options1">
            <FaAlignJustify className="optionCell" onclick="openNav()"></FaAlignJustify>


            <div className="container1">


                <button className="options-btn1 selected1 uno">
                    <i data-feather="shopping-bag"></i>
                    <span>Le mie Box</span>
                </button>
                <button className="options-btn1 due" onClick={() => {
                    navigate("/modifyshop3")
                }}>
                    <i data-feather="watch"></i>
                    <span>I miei locali</span>
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
                        <h2>Le mie Box <FaPlusCircle color="green" onClick={() => {
                            navigate("/addbox");
                        }}></FaPlusCircle></h2>
                        <span>Gestisci le box</span>
                    </div>
                    <div className="header-viewOptions1">

                    </div>
                </div>

                <div className="listings-grid1">
                    <div className="listings-col1" style={{maxHeight: 700, overflow: 'scroll'}}>
                        {boxes.map(item => (
                            <BoxItemOwner box={item}></BoxItemOwner>

                        ))}
                    </div>
                </div>
            </div>
        </div>


        {/* <script src="/scripts/main.js"></script>*/}
        <script src="https://unpkg.com/feather-icons"></script>
        <script>
            feather.replace()
        </script>
        </body>


    );
}

export default ModifyShop2;
