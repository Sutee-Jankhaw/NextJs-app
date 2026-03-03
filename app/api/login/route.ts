import { users, User } from "@/lib/user"

export async function POST(req: Request) {
  const body:User = await req.json()

  const user = users.find(
    (u) => u.email === body.email && u.password === body.password
  )

  if (!user) {
    return Response.json({ success: false })
  }

  return Response.json({ success: true })
}