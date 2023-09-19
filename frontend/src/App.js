import React, {useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";

import HomePage from './components/HomePage/index.js';
import HomePage2 from './components/HomePage/index2.js';
import HomePage3 from './components/HomePage/index3.js';

import BoxPage from './components/BoxPage/index.js';
import ReservationsPage from './components/ReservationsPage/index.js';
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
import {ClerkProvider, SignedIn, SignedOut,RedirectToSignIn,SignIn,SignUp} from '@clerk/clerk-react';
import './components/HomePage/selection.js';
import GreetingPage from './components/GreetingPage/index.js';
import AccessPage from './components/Access/index.js';
import { useUser } from '@clerk/clerk-react';
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

      
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        

        
        
        <Route path="/" 
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
                    <Route path="/greeting_page" element={ <>
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
                    <Route path="/modifyshop2" element={ <>
            <SignedIn>
              <ModifyShop2 />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/modifyshop3" element={ <>
            <SignedIn>
              <ModifyShop3 />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/addbox" element={ <>
            <SignedIn>
              <AddBoxPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/negozio" element={ <>
            <SignedIn>
              <NegozioPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
                    <Route path="/boxvendor" element={ <>
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


}

export default App;
