import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddTodo() {
  const [title , setTitle] = useState("")
  const [content , setContent] = useState("")
  const navigate = useNavigate()

  const addTodo = async(e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/addtodo" , {
        title,
        content
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
       <div className="addtodoPage flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className='addTodo rounded-lg self-center pb-8'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add TODO
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  onSubmit={addTodo} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Content
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  )
}
