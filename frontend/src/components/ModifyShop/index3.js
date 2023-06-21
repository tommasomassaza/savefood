import boxes from "../../data/boxes.json";
import BoxItemOwner from '../BoxItem/indexowner.js';
import {useNavigate} from "react-router-dom";
import {FaAlignJustify, FaCalendarCheck, FaMapMarkerAlt, FaPlusCircle, FaSearch} from "react-icons/fa";


import React, {useEffect, useState} from "react";
import '../HomePage/HomePage.scss';
import {UserButton} from "@clerk/clerk-react";


function ModifyShop3() {


    //per navigare tra i link
    const navigate = useNavigate();


    function buttonColor() {
        document.getElementById("options-btn1").style.backgroundColor = '#911';
    }


    //console.log(posts)
    const [shops, setShops] = useState([]);

    let getShops = () => {
        fetch('http://localhost:8080/api/shops')
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();

            })
            .then((result) => {
                    console.log(result);
                    setShops(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    };


    useEffect(() => {
        getShops();
    }, []);


    //barra di ricerca, non ancora implementata
    const [searchTerm, setSearchTerm] = useState("");


    //gestione dei filtri
    const [category, setCategory] = useState("Oggi");
    const [allProducts, setAllProducts] = useState(boxes);




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


                <button className="options-btn1 uno" onClick={() => {
                    navigate("/modifyshop2")
                }}>
                    <i data-feather="shopping-bag"></i>
                    <span>Le mie Box</span>
                </button>
                <button className="options-btn1 selected1 due">
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
                        <h2>I miei locali <FaPlusCircle color="green" onClick={() => {
                            navigate("/negozio");
                        }}></FaPlusCircle></h2>
                        <span>Gestisci le box</span>
                    </div>
                    <div className="header-viewOptions1">

                    </div>
                </div>

                <div className="listings-grid1">
                    <div className="listings-col1" style={{maxHeight: 700, overflow: 'scroll'}}>
                        {shops.map(item => (
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

export default ModifyShop3;

