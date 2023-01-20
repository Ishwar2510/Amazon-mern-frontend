import Navbaar from './Components/header/Navbaar';
import Newnav from './Components/newnav/Newnav';
import Maincomp from './Components/home/Maincomp';
import Footer from './Components/footer/Footer';
import Signup from './Components/signup_signin/SignUp';
import SignIn from './Components/signup_signin/SignIn';
import Cart from './Components/cart/Cart';
import Buynow from './Components/buynow/Buynow';
import './App.css';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Routes, Route } from "react-router-dom";


function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])


  return (
    <>
      {
        data ? (
          <>
            <Navbaar />
            <Newnav />
            <Routes>
              <Route exact path="/" element={<Maincomp/>}/>
               
             
              <Route exact path="/signup" element={<Signup />}/>
                
              
              <Route exact path="/login" element={<SignIn />}/>
                
              
              <Route exact path="/getproductsone/products/:id" element={<Cart />}/>
                
              
              <Route exact path="/buynow" element={<Buynow />}/>
                
              
            </Routes>
            <Footer />
          </>
        ) : (
          <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )
      }

    </>
  );
}

export default App;
