"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [data,setData] = useState("nothing")

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me")
      setData(response.data.Data._id)
    } catch (error : any) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout Successful")
      router.push("/login")
    } catch (error : any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>{data === "nothing" ? "Nothing to display" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button onClick={logout} className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>
        LogOut
      </button> 
      <button onClick={getUserDetails} className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>
        Get User Details
      </button>     
    </div>
  )
}

 