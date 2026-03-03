"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [points, setPoints] = useState(0)
  const [cart, setCart] = useState<{ id: number; name: string; point:number; price: number }[]>([])

  const handleLogout = () => {
    router.push("/login")
  }
  const products = [
    { id: 1, name: "ฟองเต้าหู้ทอด",point: 1, price: 10},
    { id: 2, name: "ไส้กรอก",point: 1, price: 15},
    { id: 3, name: "เห็ดเข็มทองพันเบคอน",point:2, price: 20},
    { id:4, name: "เบคอนพันไส้กรอก",point:2, price: 25}
  ]

  const getQuantity = (productId: number) => {
    return cart.filter(item => item.id === productId).length
  }

  const addToCart = (product: { id: number; name: string; point:number; price: number }) => {
    setCart([...cart, product])
  }
  const removeFromCart = (productId: number) => {
    const index = cart.findIndex(item => item.id === productId)

    if (index !== -1) {
      const newCart = [...cart]
      newCart.splice(index, 1)
      setCart(newCart)
    }
  }

  const totalPoint = cart.reduce((sum, item) => sum + item.point, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  const confirmOrder = () => {
  if (cart.length === 0) return
    setPoints(points + totalPoint)
    setCart([])
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ร้านหมาล่า</h1>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded">
            Points: {points}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
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
              
              <p className="text-sm mb-2">
                In Cart: {getQuantity(product.id)}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-3 py-1 rounded w-full"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-gray-300 text-black px-3 py-1 rounded w-full"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            Total Items: {cart.length}
          </h3>

          <h3 className="text-lg font-bold">
            Total Price: {totalPrice} ฿
          </h3>
          <p className="text-sm text-green-600">
            Points: {totalPoint}
          </p>
        </div>
        <button
          onClick={confirmOrder}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Confirm Order
        </button>
      </div>
    </div>
  )
}