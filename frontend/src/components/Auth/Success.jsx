import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Calendar} from "../Calendar/Calendar";

export const Success = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/auth/google/success",
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <>
      {!user ? (
        <div className="w-full flex justify-center items-center">
          <h2 className="text-2xl font-bold text-blue">
            {" "}
            Oops!....... Login First{" "}
            <Link to="/">
              <span className="text-red text-2xl font-bold">GO</span>
            </Link>{" "}
          </h2>
        </div>
      ) : (
        <div className="">
          <div className="flex flex-row justify-between p-3 items-center text-white bg-[#333]">
            <h1>Welcome, {user.displayName}</h1>
            <div className="flex flex-row justify-end items-center">
            <div className="w-2/5 h-2/5 rounded-xl"><img className="w-full h-full p-4" src={user.photos[0].value} alt={user.displayName} /></div>
            <Link to="http://localhost:5000/auth/google/signout">
              <button>Sign Out</button>
            </Link>
            </div>
          </div>
          {/* <CHome user={user} /> */}
          
          <Calendar user={user}/>
        </div>
      )}
    </>
  );
};

