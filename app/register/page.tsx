"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })

    alert("Registered!")
    router.push("/login")
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
    </div>
  )
}