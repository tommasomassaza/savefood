import React, { useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";


import { GoogleLogin } from 'react-google-login';
import { setAuth } from '../routes/PrivateRoutes.js';

/*const clientId =  "124254457715-gdko0camj6927rjp1m0m4treen83j1a7.apps.googleusercontent.com";*/

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (user) => {
      setIsLoggedIn(true);
      setUser(user);
    };

   const handleLogout = () => {
      setIsLoggedIn(false);
      setUser(null);
   };


  const submitHandler = (e) => {
    e.preventDefault();
  };

  const responseMessage = (response) => {
          console.log(response);
      };
      const errorMessage = (error) => {
          console.log(error);
  };




    const handleGoogleLoginSuccess = (response) => {
        //setAuth({ isAuthenticated: true });
    };

    const handleGoogleLoginFailure = (response) => {
      // Your Google login failure logic goes here
    };


  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    ref={loginNameRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={loginPasswordRef}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Login
                </button>
                <Container className="mt-3">
                                <GoogleLogin
                                  clientId="124254457715-gdko0camj6927rjp1m0m4treen83j1a7.apps.googleusercontent.com"
                                  buttonText="Login with Google"
                                  onSuccess={handleGoogleLoginSuccess}
                                  onFailure={handleGoogleLoginFailure}
                                  cookiePolicy={'single_host_origin'}
                                />
                </Container>
              </form>
              <Link to="/register">
                Non hai un account? Creane uno
              </Link>
            </Col>
          </Row>
        </Container>

      </section>
    </Helmet>
  );
};

export default Login;
