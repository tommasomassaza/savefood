
import boxes from "../../data/boxes.json";
import BoxItem from '../BoxItem/index.js';
import {useNavigate} from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import './slider.js';
//import './selection.js';
//import Script from '../../scripts/main.js';




import React, { useState, useEffect } from "react";
import './HomePage.scss';





function HomePage (){


  //per navigare tra i link
  const navigate = useNavigate();



 //console.log(posts)
  const [random_sostituire, setBoxes] = useState ([]);

  let getBoxes = () =>{
    fetch('http://localhost:8083/api/reviews')
    .then(res=>{
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

//gestione delle frecce a scorrimento + randon query per aggiornare lo script dopo la navigazione web (non funzia dopo la navigazione)
//<Script> </Script>
  
 

  //barra di ricerca, non ancora implementata
  const [searchTerm, setSearchTerm] = useState("");
  
   

    
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
          if(searchTerm === ""){
          setAllProducts(boxes);}
          else{
          const filteredProducts = boxes.filter(
            (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setAllProducts(filteredProducts);
        }

      }

    }, [category,searchTerm]);
  
    


  return (

  <body>
   
    <header>
      <div className="container1">
        <div className="logo1">
          <h1>Save<span>Food</span></h1>
        </div>
        <div className="currentDetails1">
          <div className="header-option1">
            <i data-feather="map-pin"></i>
            <span>Google Maps</span>
          </div>
          <div className="header-option1" onClick={() => {navigate("/reservations");}}>
            <i data-feather="clock"></i>
            <span>I miei ordini</span>
          </div>
        </div>
        
  
        <div className="searchBar1">
          <div className="header-option1">
            <i data-feather="search1"></i>
            <input className="searchQueryInput" type="text" placeholder="Cerca Box..."  onChange={ event => {setSearchTerm(event.target.value); setCategory("Searched"); }}/>
          


          </div>
          <div className="header-option1" onClick={() => {navigate("/login");}}>
            <span>Log in</span>
          </div>
        </div>
      </div>
    </header>


    <div className="options1">
      <div className="container1">
        <button className="options-btn1 selected1" onClick={() => setCategory("Tutti")}>
          <i data-feather="shopping-bag"></i>
          <span>Tutti</span>
        </button>
        <button className="options-btn1" onClick={() => setCategory("Piccole")}>
          <i data-feather="watch"></i>
          <span>Piccole</span>
        </button>
        <button className="options-btn1" onClick={() => setCategory("Pranzo")}>
          <i data-feather="watch"></i>
          <span>Pranzo</span>
        </button>
        <button className="options-btn1" onClick={() => setCategory("Cena")}>
          <i data-feather="watch"></i>
          <span>Cena</span>
        </button>
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
            <div className="viewAll1">
              <span>Vedi tutti</span>
            </div>
            <div className="viewMore1">
              <span className="arrow1 circle1 left1"
                ><FaArrowLeft></FaArrowLeft>
              </span>
              <span className="arrow1 circle1 right1 darker1">
              <FaArrowRight></FaArrowRight>
              </span>
            </div>
          </div>
        </div>
        <div className="listings-grid1">
          <div className="listings-col1">
          {allProducts.map(item => (
        <BoxItem box={item}></BoxItem>

      ))}
          </div>
          <div className="listings-col1">
            <div className="listings-grid-element1">
              <div className="image1">
                <img
                  src= {require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text1">
                <div className="text-title1">
                  <h3>German Doner Kebab 222</h3>
                  <div className="info1">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating1">
                  <span className="circle1">4.2</span>
                </div>
              </div>
              <div className="text-lower1">
                <span className="smallText1"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
            <div className="listings-grid-element1">
              <div className="image1">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text1">
                <div className="text-title1">
                  <h3>German Doner Kebab</h3>
                  <div className="info1">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating1">
                  <span className="circle1">4.2</span>
                </div>
              </div>
              <div className="text-lower1">
                <span className="smallText1"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
            <div className="listings-grid-element1">
              <div className="image1">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text1">
                <div className="text-title1">
                  <h3>German Doner Kebab</h3>
                  <div className="info1">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating1">
                  <span className="circle1">4.2</span>
                </div>
              </div>
              <div className="text-lower1">
                <span className="smallText1"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
          </div>
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
            <div className="viewAll1">
              <span>Vedi tutti</span>
            </div>
            <div className="viewMore1">
              <span className="arrow1 circle1 left1"
                ><FaArrowLeft></FaArrowLeft>
              </span>
              <span className="arrow1 circle1 right1 darker1">
              <FaArrowRight></FaArrowRight>
              </span>
            </div>
          </div>
        </div>
        <div className="listings-grid1">
          <div className="listings-col1">
          {allProducts.map(item => (
        <BoxItem box={item}></BoxItem>

      ))}
          </div>
          <div className="listings-col1">
            <div className="listings-grid-element1">
              <div className="image1">
                <img
                  src= {require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text1">
                <div className="text-title1">
                  <h3>German Doner Kebab 222</h3>
                  <div className="info1">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating1">
                  <span className="circle1">4.2</span>
                </div>
              </div>
              <div className="text-lower1">
                <span className="smallText1"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
            <div className="listings-grid-element1">
              <div className="image1">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text1">
                <div className="text-title1">
                  <h3>German Doner Kebab</h3>
                  <div className="info1">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating1">
                  <span className="circle1">4.2</span>
                </div>
              </div>
              <div className="text-lower1">
                <span className="smallText1"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
            <div className="listings-grid-element1">
              <div className="image1">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text1">
                <div className="text-title1">
                  <h3>German Doner Kebab</h3>
                  <div className="info1">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating1">
                  <span className="circle1">4.2</span>
                </div>
              </div>
              <div className="text-lower1">
                <span className="smallText1"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
          </div>
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
            <div className="viewAll1">
              <span>Vedi tutti</span>
            </div>
            <div className="viewMore1">
              <span className="arrow1 circle1 left1"
                ><FaArrowLeft></FaArrowLeft>
              </span>
              <span className="arrow1 circle1 right1 darker1">
              <FaArrowRight></FaArrowRight>
              </span>
            </div>
          </div>
        </div>
        <div className="listings-grid1">
          <div className="listings-col1">
          {allProducts.map(item => (
        <BoxItem box={item}></BoxItem>

      ))}
          </div>
          <div className="listings-col1">
            <div className="listings-grid-element1">
              <div className="image1">
                <img
                  src= {require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text1">
                <div className="text-title1">
                  <h3>German Doner Kebab 222</h3>
                  <div className="info1">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating1">
                  <span className="circle1">4.2</span>
                </div>
              </div>
              <div className="text-lower1">
                <span className="smallText1"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
            <div className="listings-grid-element1">
              <div className="image1">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text1">
                <div className="text-title1">
                  <h3>German Doner Kebab</h3>
                  <div className="info1">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating1">
                  <span className="circle1">4.2</span>
                </div>
              </div>
              <div className="text-lower1">
                <span className="smallText1"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
              </div>
            </div>
            <div className="listings-grid-element1">
              <div className="image1">
                <img
                  src={require('../../data/sushi2.jpg')} alt="Listing pic"
                />
              </div>
              <div className="text1">
                <div className="text-title1">
                  <h3>German Doner Kebab</h3>
                  <div className="info1">
                    <span>4.99 euro | ora ritiro: 20:30 |</span>
                  </div>
                </div>
                <div className="rating1">
                  <span className="circle1">4.2</span>
                </div>
              </div>
              <div className="text-lower1">
                <span className="smallText1"
                  >Info1 | Info2 | Info3 | Info4 | Info5</span>
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
