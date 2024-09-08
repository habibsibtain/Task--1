import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios'

export default function Feed() {
  const [todos , setTodos] = useState([])

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/alltodo" , {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setTodos(res.data.Todo)
    } catch (error) {
      console.log(error)
    }
  }



  const deleteTodo = (id) => {
    try {
       axios.delete(`http://localhost:8000/api/v1/user/deletetodo/${id}` ,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
       } ).then(
        ()=>{
          setTodos(todos.filter(todo => todo._id !== id  ))
        }
       )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect( () => {
    fetchNotes()
  } , [])
  
  return (
    <>
      <div className="notesContainer w-full h-full mt-20 flex flex-row justify-center align-middle">
        <div className="notecard w-full h-full m-4 ">
          {todos.map((e) => (
              <div key={e._id} className=" h-24 backdrop-opacity-10 backdrop-invert bg-white/40 flex flex-row shadow-md rounded-xl justify-start mt-2">
              <div className="leftSection w-11/12">
                <div className="title h-12 pl-4 pt-3 font-bold">
                  {e.title}
                </div>
                <div className="content h-32 pl-4 overflow-hidden">
                 {e.content}
                </div>
              </div>
              <div className="rightSection flex gap-4 pb-4 w-1/12 ">
                <button className="edit flex items-end"><FaEdit /></button>
                <button onClick={()=>{deleteTodo(e._id)}}   className="delete flex items-end"><MdDelete /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
