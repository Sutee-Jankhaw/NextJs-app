import { users, User } from "@/lib/user"

export async function POST(req: Request) {
  const body: User = await req.json()
  users.push(body)

  return Response.json({ message: "User created" })
}