import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Feed from "./Feed";
import AddButton from "./AddButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [user , setUser] = useState([])

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/userinfo" , {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        setUser(res.data.User)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser()
  },[])


  return (
    <div className="homePage">
      <Navbar user={user} />
      <Feed />
      <div className="fixed bottom-4 right-6 w-12 h-12 rounded-full ">
        <AddButton />
      </div>
    </div>
  );
}
