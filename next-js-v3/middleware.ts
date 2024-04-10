import { NextResponse } from "next/server"

export const middleware = (request) => {
  console.log("I'm the middleware!")
}

export default middleware

export const config = {
  matcher: ["/todos"],
}
