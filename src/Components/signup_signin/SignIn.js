import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logincontext } from "../context/Contextprovider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const url = "https://e-commerce-backend-t4z5.onrender.com";
  const { setAccount } = useContext(Logincontext);
  const navigate = useNavigate();
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;
    if (!email || !password) {
      alert("Please fill login Details");
      return;
    }
    try {
      const res = await fetch(url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        toast.error("Invalid Details !", {
          position: "top-center",
        });
      } else {
        setAccount(data);
        setData({ email: "", password: "" });
        toast.success("Login Successfully done !", {
          position: "top-center",
        });
        localStorage.setItem("ecommuserdata", data.email);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error in Login Page !", {
        position: "top-center",
      });
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_form">
          <form method="POST">
            <h1>Sign-In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={adddata}
                value={logdata.email}
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={adddata}
                value={logdata.password}
                id="password"
                placeholder="At least 6 characters"
              />
            </div>
            <button type="submit" className="signin_btn" onClick={senddata}>
              Continue
            </button>
          </form>
          <ToastContainer />
        </div>
        <div className="create_accountinfo">
          <p>New to Amazon?</p>
          <button>
            <NavLink to="/signup">Create your Amazon Account</NavLink>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
