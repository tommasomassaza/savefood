import React, {Component, useState} from 'react';
import {Router, Route, Routes, useNavigate, Navigate} from "react-router-dom";

import HomePage from './components/HomePage/index.js';
import HomePage2 from './components/HomePage/index2.js';
import HomePage3 from './components/HomePage/index3.js';

import BoxPage from './components/BoxPage/index.js';
import ReservationsPage from './components/ReservationsPage/index.js';
import LoginPage from './components/LoginPage/index.js';
import NegozioPage from './components/NegozioPage/index.js';
import ModifyShop2 from './components/ModifyShop/index2.js';
import ModifyShop3 from './components/ModifyShop/index3.js';
import ReviewsPage from './components/ReviewsPage/index.js';
import AddBoxPage from './components/AddBoxPage/index.js';
import DeleteShop from './components/DeleteShop/index.js';
import ModifyNegozio from './components/ModifyNegozio/index.js';
import DeleteBox from './components/DeleteBox/index.js';
import ModifyBox from './components/ModifyBox/index.js';
import ReviewsVendors from './components/ReviewsVendors/index.js';
import BoxPageVendor from './components/BoxPage/index_vendors.js';
import OrdiniPage from './components/OrdiniPage/index.js';
import PaymentPage from './components/PaymentPage/index.js';
import {ClerkProvider, SignIn, SignedIn, SignedOut, UserButton, SignUp} from "@clerk/clerk-react";
import './components/HomePage/selection.js';
import GreetingPage from './components/GreetingPage/index.js';
import AccessPage from './components/Access/index.js';


const clerk_pub_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {


    const [cliente, setRuolo] = useState(false);
    const [ruolo_get, setRuoloGet] = useState("cliente");


    const navigate = useNavigate();


    return (
        <ClerkProvider
            publishableKey={clerk_pub_key}
            navigate={(to) => navigate(to)}
        >


            <SignedOut>
                <SignIn appearance={{
                    elements: {rootBox: "mx-auto"},

                }}></SignIn>
            </SignedOut>


            <Routes>

                <Route path="/box" element={cliente ? <BoxPage/> : <Navigate replace to={"/access"}/>}/>
                <Route path="/reservations" element={<ReservationsPage/>}/>
                <Route
                    path="/sign-in/*"
                    element={<SignIn routing="path" path="/login"/>}
                />
                <Route path="/" element={
                    <SignedIn>
                        <HomePage/>
                    </SignedIn>
                }/>

                <Route path="/boxvendor" element={<BoxPageVendor/>}/>
                <Route path="/access" element={<AccessPage/>}/>
                <Route path="/greeting" element={<GreetingPage/>}/>
                <Route path="/negozio" element={<NegozioPage/>}/>
                <Route path="/2" element={<HomePage2/>}/>
                <Route path="/3" element={<HomePage3/>}/>
                <Route path="/payment" element={<PaymentPage/>}/>
                <Route path="/modifyshop2" element={!cliente ? <ModifyShop2/> : <Navigate replace to={"/access"}/>}/>
                <Route path="/modifyshop3" element={<ModifyShop3/>}/>
                <Route path="/reviews" element={<ReviewsPage/>}/>
                <Route path="/addbox" element={<AddBoxPage/>}/>
                <Route path="/deleteshop" element={<DeleteShop/>}/>
                <Route path="/modifynegozio" element={<ModifyNegozio/>}/>
                <Route path="/deletebox" element={<DeleteBox/>}/>
                <Route path="/modifybox" element={<ModifyBox/>}/>
                <Route path="/reviewsvendors" element={<ReviewsVendors/>}/>
                <Route path="/ordini" element={<OrdiniPage/>}/>

            </Routes>


        </ClerkProvider>

    );


}

export default App;
