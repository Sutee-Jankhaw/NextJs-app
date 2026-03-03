"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/login")
  }
  const products = [
    { id: 1, name: "ฟองเต้าหู้ทอด",point: 1, price: 10},
    { id: 2, name: "ไส้กรอก",point: 1, price: 15},
    { id: 3, name: "เห็ดเข็มทองพันเบคอน",point:2, price: 20},
    { id:4, name: "เบคอนพันไส้กรอก",point:2, price: 25}
  ]
  const [cart, setCart] = useState<{ id: number; name: string; price: number }[]>([])

  const addToCart = (product: { id: number; name: string; price: number }) => {
    setCart([...cart, product])
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ร้านหมาล่า</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="p-6 flex-1">
        <h2 className="text-lg font-semibold mb-4">
          Product List
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-bold text-lg">
                {product.name}
              </h3>

              <p className="text-gray-600 mb-3">
                Price: {product.price} ฿
              </p>

              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-3 py-1 rounded w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Total Items: {cart.length}
        </h3>

        <h3 className="text-lg font-bold">
          Total Price: {totalPrice} ฿
        </h3>
      </div>

    </div>
  )
}