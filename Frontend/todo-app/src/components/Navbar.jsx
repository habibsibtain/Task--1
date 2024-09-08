import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileName from '../utils/ProfileName'
import axios from 'axios'

export default function Navbar({user}) {
  const navigate = useNavigate()
  const userLogout = async () => {
   try {
     const res = await axios.post("http://localhost:8000/api/v1/user/logout" ,{} ,{
       headers:{
         Authorization: `Bearer ${localStorage.getItem("token")}`
       }
     })
     localStorage.removeItem("token")
     navigate(0)
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <>
      <nav className='fixed top-0 bg-orange-200 rounded-lg z-20 inset-x-0  flex justify-between p-4 shadow-md'>
        <div className="logo pt-3">Todo-App</div>
        <div className="user flex flex-col  ">
          <div className="profilePic flex justify-center pt-1 align-middle  w-9 h-9 rounded-full bg-orange-400 text-white">
            {ProfileName(user.fullname)}
          </div>
         {user.length===0 ?(<Link to='/login' className="login w-full">Login</Link>) : (<button onClick={userLogout}  className="login w-full">Logout</button>)}
        </div>
      </nav>
    </>
  )
}
