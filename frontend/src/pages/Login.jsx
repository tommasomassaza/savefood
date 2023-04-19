import React, { useRef, useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";


import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

import { useContext } from "react";

const clientId =  "124254457715-gdko0camj6927rjp1m0m4treen83j1a7.apps.googleusercontent.com";

//import { useAuth }  from "../routes/PrivateRoutes";

const Login = () => {


  const loginNameRef = useRef();
  const loginPasswordRef = useRef();

  const [auth, setAuth] = useState({ token: false });

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
                                <LoginSocialGoogle
                                        client_id={"124254457715-gdko0camj6927rjp1m0m4treen83j1a7.apps.googleusercontent.com"}
                                        scope="openid profile email"
                                        discoveryDocs="claims_supported"
                                        access_type="offline"
                                        onResolve={({ provider, data }) => {
                                          console.log(provider, data);
                                          //setAuth(prevState => ({ ...prevState, token: true }));
                                          console.log(isLoggedIn);
                                          setAuth({ token: true });
                                          console.log(auth.token);

                                        }}
                                        onReject={(err) => {
                                          console.log(err);
                                        }}
                                      >
                                        <GoogleLoginButton />
                                      </LoginSocialGoogle>

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
