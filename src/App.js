import Navbaar from "./Components/header/Navbaar";
import Newnav from "./Components/newnav/Newnav";
import Footer from "./Components/footer/Footer";
import "./App.css";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Router from "./Routes/Router";

function App() {
  const [data, setData] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Navbaar />
          <Newnav />
          <Router />
          <Footer />
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2> Loading....</h2>
        </div>
      )}
    </>
  );
}

export default App;
