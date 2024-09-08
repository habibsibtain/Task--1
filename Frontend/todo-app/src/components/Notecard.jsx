import axios from "axios";
import React from "react";

export default function Notecard({title , content , id , setTodos ,todos}) {
  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/user/deletetodo/${id}` , {
        headers:{
          Authorization:`Bearer ${localStorage.getItem(token)}`
        }
      }).then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=" backdrop-opacity-10 backdrop-invert bg-white/40 flex flex-row shadow-md rounded-xl justify-start mt-2">
      <div className="leftSection w-11/12">
        <div className="title h-12 pl-4 pt-3 font-bold">
          {title}
        </div>
        <div className="content h-32 pl-4 overflow-hidden">
         {content}
        </div>
      </div>
      <div className="rightSection flex gap-2 pb-4 pr-4 ">
        <div className="edit flex items-end">Edit</div>
        <button onClick={()=>{deleteTodo(id)}}  className="delete flex items-end">Delete</button>
      </div>
    </div>
  );
}
