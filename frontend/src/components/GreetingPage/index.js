import React from "react";
import Col from 'react-bootstrap/Col';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {useUser} from "@clerk/clerk-react";

const GreetingPage = () => {

    const {user} = useUser();
    const handleSignUp = async (role) => {
        try {

            const redirectURL = `/?role=${role}`; // Costruisci l'URL di redirect con il parametro del ruolo
            await window.Clerk?.openSignIn({
                redirectUrl: redirectURL
            });
        } catch (error) {
            console.error("Errore durante la registrazione:", error);
        }
    };


    return (
        <body>

        <div className="colore">
            <div className="greetgriglia">
                <Col
                    className="  .bg-light.bg-gradient  square   d-flex align-items-center justify-content-center text-success">


                    <button type="button" class="btn btn-success btn-sq-responsive">
                        <div className="logo1">
                            <h1>Save<span>Food</span></h1>
                        </div>
                    </button>

                    <button type="button" class="btn btn-warning btn-sq-responsive text-light"
                            onClick={() => handleSignUp("venditore")}><h3>Venditore</h3></button>
                </Col>
                <Col
                    className="  .bg-light.bg-gradient  square   d-flex align-items-center justify-content-center text-success">
                    <button type="button" class="btn btn-light btn-sq-responsive">


                        <div className="imagegreet">
                            <img
                                src={require('../../images/box.png')} alt="Lis"
                            />
                        </div>


                    </button>


                    <button type="button" class="btn btn-info btn-sq-responsive text-light"
                            onClick={() => handleSignUp("cliente")}><h3>Cliente</h3></button>
                </Col>

            </div>


        </div>

        </body>


    );
};

export default GreetingPage;