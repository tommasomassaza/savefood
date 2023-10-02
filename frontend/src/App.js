import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";

import HomePage from './components/HomePage/index.js';
import HomePage2 from './components/HomePage/index2.js';
import HomePage3 from './components/HomePage/index3.js';
import HomePage4 from './components/HomePage/index4.js';
import HomePage5 from './components/HomePage/index5.js';
import HomePage6 from './components/HomePage/index6.js';
import HomePage7 from './components/HomePage/index7.js';

import BoxPage from './components/BoxPage/index.js';
import ReservationsPage from './components/ReservationsPage/index.js';
import NegozioPage from './components/NegozioPage/index.js';
import ModifyShop2 from './components/ModifyShop/index2.js';
import ModifyShop3 from './components/ModifyShop/index3.js';
import ModifyNegozio from "./components/ModifyNegozio";
import ModifyBox from "./components/ModifyBox";
import ReviewsPage from './components/ReviewsPage/index.js';
import AddBoxPage from './components/AddBoxPage/index.js';
import ReviewsVendors from './components/ReviewsVendors/index.js';
import BoxPageVendor from './components/BoxPage/index_vendors.js';
import OrdiniPage from './components/OrdiniPage/index.js';
import PaymentPage from './components/PaymentPage/index.js';
import {ClerkProvider, SignedIn, SignedOut,RedirectToSignIn,SignIn} from '@clerk/clerk-react';
import './components/HomePage/selection.js';
import GreetingPage from './components/GreetingPage/index.js';
import AccessPage from './components/Access/index.js';
import SignUpCustom from './components/SignUp/SignUpCustom.tsx';


const clerk_pub_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;


if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key"
}

function App() {
    const [cliente, setRole] = useState(true);
    const navigate = useNavigate();
 


    return (
        <ClerkProvider
            publishableKey={clerk_pub_key}
            navigate={(to) => navigate(to)}
        >

        <Routes>


            <Route
          path="/sign-up/*"
          element={<SignUpCustom routing="path" path="/sign-up" />}
    />


            {/* Per ogni url non valido reiderizza alla home */}
        <Route path="/*" element={<NotFound />} />


        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        

        
        
        <Route path="/home"
          element={ <>
            <SignedIn>
              <HomePage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />

                    <Route path="/box" element={ <>
            <SignedIn>
              <BoxPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />




                    <Route path="/access" element={ <>
            <SignedIn>
              <AccessPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/" element={ <>
            <SignedIn>
              <GreetingPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                     <Route path="/2" element={ <>
            <SignedIn>
              <HomePage2 />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/3" element={ <>
            <SignedIn>
              <HomePage3 />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />

            <Route path="/4" element={ <>
                <SignedIn>
                    <HomePage4 />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
            }
            />

            <Route path="/5" element={ <>
                <SignedIn>
                    <HomePage5 />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
            }
            />

            <Route path="/6" element={ <>
                <SignedIn>
                    <HomePage6 />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
            }
            />

            <Route path="/7" element={ <>
                <SignedIn>
                    <HomePage7 />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
            }
            />

                    <Route path="/reservations"  element={ <>
            <SignedIn>
              <ReservationsPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/payment" element={ <>
            <SignedIn>
              <PaymentPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/reviews" element={ <>
            <SignedIn>
              <ReviewsPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/vendors/homepage" element={ <>
            <SignedIn>
              <ModifyShop2 />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/vendors/homepage2" element={ <>
            <SignedIn>
              <ModifyShop3 />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/vendors/addbox" element={ <>
            <SignedIn>
              <AddBoxPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
            <Route path="/vendors/modifybox" element={ <>
                <SignedIn>
                    <ModifyBox />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
            }
            />
                    <Route path="/vendors/addshop" element={ <>
            <SignedIn>
              <NegozioPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
            <Route path="/vendors/modifyshop" element={ <>
                <SignedIn>
                    <ModifyNegozio />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
            }
            />
                    <Route path="/vendors/box" element={ <>
            <SignedIn>
              <BoxPageVendor />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/reviewsvendors" element={ <>
            <SignedIn>
              <ReviewsVendors />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/ordini" element={ <>
            <SignedIn>
              <OrdiniPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />





           </Routes>
        </ClerkProvider>

    );

    function NotFound() {

            useEffect(() => {
                const timeout = setTimeout(() => {
                    window.location.replace('/');
                }, 3000);

                return () => clearTimeout(timeout);
            }, []);

            return <>Pagina non valida verrai reindirizzato alla home...</>;
        }


}

export default App;
