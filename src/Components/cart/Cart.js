import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { Divider } from "@mui/material";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { Logincontext } from "../context/Contextprovider";
import {useNavigate} from 'react-router-dom'

const Cart = () => {
  const {  account, setAccount } = useContext(Logincontext);
  const navigate = useNavigate()
 
  const url = "https://e-commerce-backend-t4z5.onrender.com"
  const { id } = useParams("");
  const [inddata, setIndedata] = useState("");
  const getinddata = async () => {
    const res = await fetch(url + `/getproductsone/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    
    });

    const data = await res.json();

    if (res.status !== 201) {
      alert("no data available");
    } else {
      setIndedata(data);
    }
  };

  useEffect(() => {
    setTimeout(getinddata, 1000);
  });

  const addtocart = async (id) => {
    if(!account.email){
      navigate("/login")
    }
    const check = await fetch(url + `/addcart/${account.email}/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inddata,
      }),
      
    });

    const data1 = await check.json();

    if (check.status !== 201) {
      alert("no data available");
    } else {
      setAccount(data1);
    }
  };

  return (
    <div className="cart_section">
      {inddata && Object.keys(inddata).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.detailUrl} alt="cart" />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(inddata.id)}
              >
                Add to Cart
              </button>
              <button disabled className="cart_btn2">Buy Now disabled </button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">
              M.R.P. : <del>₹{inddata.price.mrp}</del>
            </p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span>
            </p>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                {" "}
                ₹{inddata.price.mrp - inddata.price.cost} (
                {inddata.price.discount}){" "}
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{inddata.discount}</span>{" "}
              </h5>
              <h4>
                FREE Delivery :{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  {`${new Date().getDate()+1} - ${(new Date().getDate()+10)%30}`}
                </span>{" "}
                Details
              </h4>
              <p style={{ color: "#111" }}>
                Fastest delivery:{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  {" "}
                  Tomorrow 5 PM
                </span>
              </p>
            </div>
            <p className="description">
              About the Iteam :{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                {inddata.description}
              </span>
            </p>
          </div>
        </div>
      )}

      {!inddata ? (
        <div className="circle">
          <CircularProgress />
          <h2> Loading....</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
