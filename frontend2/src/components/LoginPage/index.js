import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
}
from 'mdb-react-ui-kit';


import {useNavigate} from "react-router-dom";


function LoginPage() {
    const navigate = useNavigate();

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

 


  return (
    <body>
   
    <header>
      <div className="container1">
        <div className="logo1" onClick={() => {navigate("/");navigate(0);}}>
          <h1>Save<span>Food</span></h1>
        </div>
        <div className="currentDetails1">
          <div className="header-option1">
            <i data-feather="map-pin1"></i>
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
            <span>Cerca</span>
          </div>
          <div className="header-option1" onClick={() => {navigate("/login");}}>
            <span>Log in</span>
          </div>
        </div>
      </div>
    </header>


    <div className="options1">
      <div className="container1">

      <div className="header-title1">
            <h2>Esegui il login:</h2>
          </div>
    
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem >
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Registrati
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Google:</p>

            <div className='d-flex justify-content-between mx-auto'  style={{width: '40%'}}>
            <MDBBtn className="mb-4 w-100" color="danger">Google</MDBBtn>
            </div>

            <p className="text-center mt-3">oppure:</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' />
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Ricordami' />
            <a href="!#">Password dimenticata?</a>
          </div>

          <MDBBtn className="mb-4 w-100">Log in</MDBBtn>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Google:</p>

            <div className='d-flex justify-content-between mx-auto'  style={{width: '40%'}}>
            <MDBBtn className="mb-4 w-100" color="danger">Google</MDBBtn>
            </div>

            <p className="text-center mt-3">oppure:</p>
          </div>

          
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>


          <MDBBtn className="mb-4 w-100">Registrati</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>

    </div>
    </div>
    </body>
  );
}

export default LoginPage;