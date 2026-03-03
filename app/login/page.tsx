"use client"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (data.success) {
      router.push("/dashboard")
    } else {
      alert("Login failed")
    }
  }
  const linkToRegister = () => {
    router.push("/register")
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 rounded shadow-md">
        <h1 className="flex justify-center">membership System</h1>
        <input 
          className="border p-2 mb-3 w-full"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
         Login
        </button>
        <button
          type="button"
          onClick={linkToRegister}
          className="text-blue-500 px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  )
}