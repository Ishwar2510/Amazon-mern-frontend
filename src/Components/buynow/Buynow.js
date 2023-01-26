import { Divider } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import "./buynow.css";
import Empty from "./Empty";
import Option from "./Option";
import Right from "./Right";
import Subtotal from "./Subtotal";
import { Logincontext } from "../context/Contextprovider";
import { useNavigate } from "react-router-dom";

const Buynow = () => {
  const url = "https://e-commerce-backend-t4z5.onrender.com";
  const { account } = useContext(Logincontext);
  const navigate = useNavigate();
  if (!account.email) {
    navigate("/login");
  }

  const [cartdata, setCartdata] = useState("");
  const getdatabuy = async () => {
    const res = await fetch(url + `/cartdetails/${account.email}`, {
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
      setCartdata(data.carts);
    }
  };
  getdatabuy();
  return (
    <>
      {cartdata.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />
              {cartdata.map((e, ind) => {
                return (
                  <div key={ind}>
                    <div className="item_containert">
                      <img src={e.detailUrl} alt="imgitem" />
                      <div className="item_details">
                        <h3>{e.title.longTitle}</h3>
                        <h3>{e.title.shortTitle}</h3>
                        <h3 className="diffrentprice">₹{e.price.cost}.00</h3>
                        <p className="unusuall">
                          Usually dispatched in 8 days.
                        </p>
                        <p>Eligible for FREE Shipping</p>
                        <img
                          src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                          alt="logo"
                        />
                        <Option deletedata={e.id} get={getdatabuy} />
                      </div>
                      <h3 className="item_price">₹{e.price.cost}.00</h3>
                    </div>
                    <Divider />
                  </div>
                );
              })}
              <Subtotal iteam={cartdata} />
            </div>
            <Right iteam={cartdata} />
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};
export default Buynow;
