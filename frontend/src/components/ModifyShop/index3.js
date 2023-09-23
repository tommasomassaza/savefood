import boxes from "../../data/boxes.json";
import BoxItemOwner from '../BoxItem/indexowner.js';
import {useNavigate} from "react-router-dom";
import {FaAlignJustify, FaCalendarCheck, FaPlusCircle, FaSearch} from "react-icons/fa";
import { globalData } from "../GreetingPage/global";
import React, {useEffect, useState} from "react";
import '../HomePage/HomePage.scss';
import {UserButton} from "@clerk/clerk-react";


function ModifyShop3() {


    console.log("il globalshopid è: " + globalData.globalShopsId)


    //per navigare tra i link
    const navigate = useNavigate();



    function buttonColor() {
        document.getElementById("options-btn1").style.backgroundColor = '#911';
    }


    //console.log(posts)
    const [boxes, setBoxes] = useState([]);

    let getBoxes = () => {
        fetch('http://localhost:8080/api/boxes/getByShopId/'+globalData.globalShopsId)
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                console.log("questo è lo shopId:"+globalData.globalShopsId);
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


    //gestione dei filtri
    const [category, setCategory] = useState("Tutti");
    const [allProducts, setAllProducts] = useState(boxes);

    useEffect(() => {
       // navigate(0);
        getBoxes();
    }, []);


    //barra di ricerca, non ancora implementata
    const [searchTerm, setSearchTerm] = useState("");


    return (


        <body>


        <header>

            <div className="container1">

                <div className="logo1" onClick={() => {
                    navigate("/greeting_page");
                }}>
                    <h1>Save<span>Food </span></h1>
                </div>

                <div className="currentDetails1">
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
                    navigate("/vendors/homepage")
                }}>
                    <i data-feather="shopping-bag"></i>
                    <span>I miei locali</span>
                </button>
                <button className="options-btn1 selected1 due">
                    <i data-feather="watch"></i>
                    <span>Le mie box</span>
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
                            navigate("/vendors/addbox");
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

export default ModifyShop3;

