import React, { useContext } from "react";
import { Logincontext } from "../context/Contextprovider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({ deletedata, get }) => {
  const url = "https://e-commerce-backend-t4z5.onrender.com";
  const { account, setAccount } = useContext(Logincontext);
  const removedata = async (id) => {
    try {
      const res = await fetch(url + `/remove/${account.email}/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        alert("error while removing");
      } else {
        setAccount(data);
        get();
        toast.success("Iteam remove from cart 😃!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add_remove_select" key={deletedata}>
      <p onClick={() => removedata(deletedata)} style={{ cursor: "pointer" }}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia">Save Or Later</p>
      <span>|</span>
      <p className="forremovemedia">See More like this</p>
      <ToastContainer />
    </div>
  );
};

export default Option;
