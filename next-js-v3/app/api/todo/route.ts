import db from '@/utils/db'
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  return NextResponse.json({ message: "hello get" })
}

export const POST = async (request: Request) => {
  const data = await request.json()
  const todo = await db.todo.create({ data })
  return NextResponse.json({ data: todo })
}

export const OPTIONS = () => {

}
