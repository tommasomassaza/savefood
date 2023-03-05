
import './HomePage.scss';
import './slider.js';
import BoxItem from '../BoxItem/index.js';
import boxes from "../../data/boxes.json";
import {useNavigate} from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import React, { useState, useEffect } from "react";



import Script from '../../scripts/main.js';
import SearchBar from '../SearchBarItem';



function HomePage (){


  //barra di ricerca, non ancora implementata
  const {searchTerm, setSearchTerm} = useState("");
  
    //per navigare tra i link
    const navigate = useNavigate();

    
    //gestione dei filtri
    const [category, setCategory] = useState("Tutti");
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

      if (category === "Searched") {
      
          if(searchTerm = "")
          setAllProducts(boxes);
          else{

          const filteredProducts = boxes.filter(
            (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase)
          );
          setAllProducts(filteredProducts);}

        
      }

    }, [category]);
  
    //gestione delle frecce a scorrimento + randon query per aggiornare lo script dopo la navigazione web (non funzia dopo la navigazione)
    <Script className='script-tag-js' src={`https://code.jquery.com/jquery-3.6.0.js?foo=${Math.round(Math.random() * 100)}`}> </Script>
  
  return (

  <body>
   
    <header>
      <div className="container">
        <div className="logo">
          <h1>Save<span>Food</span></h1>
        </div>
        <div className="currentDetails">
          <div className="header-option">
            <i data-feather="map-pin"></i>
            <span>Google Maps</span>
          </div>
          <div className="header-option" onClick={() => {navigate("/reservations");}}>
            <i data-feather="clock"></i>
            <span>I miei ordini</span>
          </div>
        </div>
        
  
        <div className="searchBar">
          <div className="header-option">
            <i data-feather="search"></i>
            <input type="text" placeholder="Cerca..." onChange={event => {setSearchTerm(event.target.value);setCategory("Searched"); }}/>
            

          </div>
          <div className="header-option" onClick={() => {navigate("/login");}}>
            <span>Log in</span>
          </div>
        </div>
      </div>
    </header>

   
    <div className="options">
      <div className="container">
        <button className="options-btn selected" onClick={() => setCategory("Tutti")}>
          <i data-feather="shopping-bag"></i>
          <span>Tutti</span>
        </button>
        <button className="options-btn" onClick={() => setCategory("Piccole")}>
          <i data-feather="watch"></i>
          <span>Piccole</span>
        </button>
      </div>
    </div>


    <div className="listings">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h2>Disponibili oggi</h2>
            <span>Box in scadenza</span>
          </div>
          <div className="header-viewOptions">
            <div className="viewAll">
              <span>Vedi tutti</span>
            </div>
            <div className="viewMore">
              <span className="arrow circle left"
                ><FaArrowLeft></FaArrowLeft>
              </span>
              <span className="arrow circle right darker">
              <FaArrowRight></FaArrowRight>
              </span>
            </div>
          </div>
        </div>
        <div className="listings-grid">
          <div className="listings-col">
          {allProducts.map(item => (
        <BoxItem box={item}></BoxItem>

      ))}
          </div>
          <div className="listings-col">
            <div className="listings-grid-element">
              <div className="image">
                <img
                  src= {require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text">
                <div className="text-title">
                  <h3>German Doner Kebab 222</h3>
                  <div className="info">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating">
                  <span className="circle">4.2</span>
                </div>
              </div>
              <div className="text-lower">
                <span className="smallText"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
            <div className="listings-grid-element">
              <div className="image">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text">
                <div className="text-title">
                  <h3>German Doner Kebab</h3>
                  <div className="info">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating">
                  <span className="circle">4.2</span>
                </div>
              </div>
              <div className="text-lower">
                <span className="smallText"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
            <div className="listings-grid-element">
              <div className="image">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text">
                <div className="text-title">
                  <h3>German Doner Kebab</h3>
                  <div className="info">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating">
                  <span className="circle">4.2</span>
                </div>
              </div>
              <div className="text-lower">
                <span className="smallText"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  
    <div className="listings">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h2>Vicino a te</h2>
            <span>Box nelle vicinanze</span>
          </div>
          <div className="header-viewOptions">
            <div className="viewAll">
              <span>Vedi tutti</span>
            </div>
            <div className="viewMore">
              <span className="arrow circle left"
                ><FaArrowLeft></FaArrowLeft>
              </span>
              <span className="arrow circle right darker">
              <FaArrowRight></FaArrowRight>
              </span>
            </div>
          </div>
        </div>
        <div className="listings-grid">
          <div className="listings-col">
          {allProducts.map(item => (
        <BoxItem box={item}></BoxItem>

      ))}
          </div>

          <div className="listings-col">
            <div className="listings-grid-element">
              <div className="image">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text">
                <div className="text-title">
                  <h3>German Doner Kebab 222</h3>
                  <div className="info">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating">
                  <span className="circle">4.2</span>
                </div>
              </div>
              <div className="text-lower">
                <span className="smallText"
                  >German | Middle Eastern | Halal | Burger| Fast Food</span>
              </div>
            </div>
            <div className="listings-grid-element">
              <div className="image">
                <img
                  src={require('../../data/sushi2.jpg')}   alt="Listing pic"
                />
              </div>
              <div className="text">
                <div className="text-title">
                  <h3>German Doner Kebab</h3>
                  <div className="info">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating">
                  <span className="circle">4.2</span>
                </div>
              </div>
              <div className="text-lower">
                <span className="smallText"
                  >German | Middle Eastern | Halal | Burger| Fast Food</span>
              </div>
            </div>
            <div className="listings-grid-element">
              <div className="image">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text">
                <div className="text-title">
                  <h3>German Doner Kebab</h3>
                  <div className="info">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating">
                  <span className="circle">4.2</span>
                </div>
              </div>
              <div className="text-lower">
                <span className="smallText"
                  >German | Middle Eastern | Halal | Burger| Fast Food</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="listings">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h2>Offerte speciali</h2>
            <span>Box in sconto</span>
          </div>
          <div className="header-viewOptions">
            <div className="viewAll">
              <span>Vedi tutti</span>
            </div>
            <div className="viewMore">
              <span className="arrow circle left"
                ><FaArrowLeft></FaArrowLeft>
              </span>
              <span className="arrow circle right darker">
              <FaArrowRight></FaArrowRight>
              </span>
            </div>
          </div>
        </div>
        <div className="listings-grid">
          <div className="listings-col">
          {allProducts.map(item => (
        <BoxItem box={item}></BoxItem>

      ))}
          </div>
          <div className="listings-col">
            <div className="listings-grid-element">
              <div className="image">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text">
                <div className="text-title">
                  <h3>German Doner Kebab 222</h3>
                  <div className="info">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating">
                  <span className="circle">4.2</span>
                </div>
              </div>
              <div className="text-lower">
                <span className="smallText"
                  >German | Middle Eastern | Halal | Burger| Fast Food</span>
              </div>
            </div>
            <div className="listings-grid-element">
              <div className="image">
                <img
                  src={require('../../data/sushi2.jpg')}alt="Listing pic"
                />
              </div>
              <div className="text">
                <div className="text-title">
                  <h3>German Doner Kebab</h3>
                  <div className="info">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating">
                  <span className="circle">4.2</span>
                </div>
              </div>
              <div className="text-lower">
                <span className="smallText"
                  >German | Middle Eastern | Halal | Burger| Fast Food</span>
              </div>
            </div>
            <div className="listings-grid-element">
              <div className="image">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text">
                <div className="text-title">
                  <h3>German Doner Kebab</h3>
                  <div className="info">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating">
                  <span className="circle">4.2</span>
                </div>
              </div>
              <div className="text-lower">
                <span className="smallText"
                  >German | Middle Eastern | Halal | Burger| Fast Food</span>
              </div>
            </div>
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

export default HomePage;
