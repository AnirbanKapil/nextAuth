"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default  function signUpPage() {
  
  const router = useRouter()

  const [user,setUser] = useState({
    username : "",
    email : "",
    password : ""
  })

  const [buttonDisable,setButtonDisable] = useState(false)

  const [loading,setLoading] = useState(false)

  const onSignUp = async () => {
    try {
       setLoading(true)
       const response = await axios.post("/api/users/signup",user)
       console.log("Signup success",response.data)
       router.push("/login")
    } catch (error : any) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  useEffect(()=>{
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "SignUp"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input type="text"
       className="p-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-gray-600"
       id="username"
       value={user.username}
       onChange={(e)=> setUser({...user,username : e.target.value})}
       placeholder="username"
      />
      <label htmlFor="email">Email</label>
      <input 
      type = "text"
      id="email"
      className="p-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-gray-600"
      value={user.email}
      onChange={(e)=> setUser({...user,email : e.target.value})}
      />
      <label htmlFor="password">Password</label>
      <input 
      type ="text"
      id="password"
      className="p-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-gray-600"
      value={user.password}
      onChange={(e) => setUser({...user,password : e.target.value})}
      />
      <button onClick={onSignUp} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        {buttonDisable ? "No SignUp" : "SignUp"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  )
}

