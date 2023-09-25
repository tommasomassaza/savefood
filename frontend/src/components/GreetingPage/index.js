import React from "react";
import Col from 'react-bootstrap/Col';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {useUser} from "@clerk/clerk-react";
import {useNavigate} from "react-router-dom";
import {globalDataRole} from "./global"

const GreetingPage = () => {

    const navigate = useNavigate();

    const {user} = useUser();
    const handleSignUp = async (role) => {

        globalDataRole.setGlobalRole(role); // Utilizza la funzione di impostazione
        if(role === "cliente") {
            navigate("/");
        } else if(role === "venditore") {
            navigate("/vendors/homepage");
        }
    };


    

    return (
        <body>

        <div className="colore">
            <div className="greetgriglia">
                <Col
                    className="  .bg-light.bg-gradient  square   d-flex align-items-center justify-content-center text-success">


                    <button type="button" class="btn btn-success btn-sq-responsive active">
                        <div className="logo1">
                            <h1>Save<span>Food</span></h1>
                        </div>
                    </button>

                    <button type="button" class="btn btn-success btn-sq-responsive text-light"
                            onClick={() => {
                                handleSignUp("cliente");
                                navigate("/");
                            }}> <div className="logo1">
                            <h1>Customer</h1>
                        </div></button>
                </Col>
                <Col
                    className="  .bg-light.bg-gradient  square   d-flex align-items-center justify-content-center text-success">
                    <button type="button" class="btn btn-light btn-sq-responsive active">


                        <div className="imagegreet">
                            <img
                                src={require('../../images/box.png')} alt="Lis"
                            />
                        </div>


                    </button>


                    <button type="button" class="btn btn-info btn-sq-responsive text-light"
                            onClick={() => {
                                handleSignUp("venditore");
                                navigate("/vendors/homepage");
                            }}> <div className="logo1"><h1>Vendor</h1></div></button>
                </Col>

            </div>


        </div>

        </body>


    );
};

export default GreetingPage;